import NoEventView from "../view/no-event.js";
import TripSortView from "../view/trip-sort.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter from "./event.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortTime, sortPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../utils/filter.js";
import EventNewPresenter from "./event-new.js";
import LoadingView from "../view/loading.js";

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel, offersModel, destinationsModel, api) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._listDays = [];
    this._isLoading = true;
    this._api = api;

    this._tripSortComponent = null;
    this._tripDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._tripDaysComponent, this._handleViewAction);

  }

  init() {
    this._renderTrip();

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    const listOffers = this._offersModel.getOffers();
    const listDestinations = this._destinationsModel.getDestinations();
    this._eventNewPresenter.init(callback, this._tripSortComponent, listOffers, listDestinations);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredEvents.sort(sortTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortPrice);
    }
    return filtredEvents;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._api.updateData(update).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        });
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    const listOffers = this._offersModel.getOffers();
    const listDestinations = this._destinationsModel.getDestinations();
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data, listOffers, listDestinations);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _renderEvent(eventListElement, event) {
    const listOffers = this._offersModel.getOffers();
    const listDestinations = this._destinationsModel.getDestinations();

    const eventPresenter = new EventPresenter(eventListElement, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, listOffers, listDestinations);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    remove(this._tripSortComponent);
    remove(this._noEventComponent);
    remove(this._loadingComponent);
    remove(this._tripDaysComponent);
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._listDays.forEach((item) => remove(item));
    this._listDays = [];

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTripSort() {
    if (this._tripSortComponent !== null) {
      this._tripSortComponent = null;
    }

    this._tripSortComponent = new TripSortView(this._currentSortType);

    render(this._tripContainer, this._tripSortComponent, RenderPosition.BEFOREEND);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripDays() {
    render(this._tripContainer, this._tripDaysComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {

    const listEvents = this._getEvents();

    if (this._currentSortType === SortType.DEFAULT) {
      let currentDay = listEvents[0].startDate.getDate();
      let currentDate = listEvents[0].startDate;
      let countDay = 1;
      let index = 0;
      let i;

      do {
        const dayComponent = new DayView(currentDate, countDay);
        render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);
        this._listDays.push(dayComponent);
        const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
        for (i = index; i < listEvents.length; i++) {

          if (listEvents[i].startDate.getDate() === currentDay) {
            this._renderEvent(tripEventsListElement, listEvents[i]);
          } else {
            currentDay = listEvents[i].startDate.getDate();
            currentDate = listEvents[i].startDate;
            countDay++;
            index = i;
            break;
          }
        }
      } while (i < listEvents.length);
    } else {
      const dayComponent = new DayView(null, 0);
      render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);
      this._listDays.push(dayComponent);
      const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
      listEvents.forEach((item) => this._renderEvent(tripEventsListElement, item));
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripSort();
    this._renderTripDays();
    this._renderTripEvents();
  }
}
