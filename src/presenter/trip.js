import NoEventView from "../view/no-event.js";
import TripSortView from "../view/trip-sort.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter from "./event.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortTime, sortPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._listDays = [];

    //this._tripSortComponent = new TripSortView();
    this._tripSortComponent = null;
    this._tripDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortTime);
        break;
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortPrice);
        break;
    }
    return this._eventsModel.getEvents();
  }
/*
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._renderTripEvents();
  }
  */
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
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
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    remove(this._tripSortComponent);
    remove(this._noEventComponent);
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
/*
  _clearTripEvents() {
    //this._tripDaysComponent.getElement().innerHTML = ``;
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._listDays.forEach((item) => remove(item));
    this._listDays = [];
  }
*/
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

    //this._clearTripEvents();

    if (this._currentSortType === SortType.DEFAULT) {
      let currentDay = this._getEvents()[0].startDate.getDate();
      let currentDate = this._getEvents()[0].startDate;
      let countDay = 1;
      let index = 0;
      let i;

      do {
        const dayComponent = new DayView(currentDate, countDay);
        render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);
        this._listDays.push(dayComponent);
        const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

        for (i = index; i < this._getEvents().length; i++) {

          if (this._getEvents()[i].startDate.getDate() === currentDay) {
            this._renderEvent(tripEventsListElement, this._getEvents()[i]);
          } else {
            currentDay = this._getEvents()[i].startDate.getDate();
            currentDate = this._getEvents()[i].startDate;
            countDay++;
            index = i;
            break;
          }
        }
      } while (i < this._getEvents().length);
    } else {
      const dayComponent = new DayView(null, 0);
      render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);
      this._listDays.push(dayComponent);
      const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
      this._getEvents().forEach((item) => this._renderEvent(tripEventsListElement, item));
    }
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripSort();
    this._renderTripDays();
    this._renderTripEvents();
    console.log(this._currentSortType);
  }
}
