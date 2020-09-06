import NoEventView from "../view/no-event.js";
import TripSortView from "../view/trip-sort.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter from "./event.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortTime, sortPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};

    this._tripSortComponent = new TripSortView();
    this._tripDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
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

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    if (this._currentSortType === SortType.DEFAULT) {
      this._renderTripEvents();
      return;
    }
    this._renderTripEventsSort();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    // Здесь будем вызывать обновление модели
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTripEvents() {
    this._tripDaysComponent.getElement().innerHTML = ``;
    this._eventPresenter = {};
  }

  _renderTripSort() {
    render(this._tripContainer, this._tripSortComponent, RenderPosition.BEFOREEND);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripDays() {
    render(this._tripContainer, this._tripDaysComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEventsSort() {

    this._clearTripEvents();

    const dayComponent = new DayView(null, 0);
    render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);
    const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
    /*
    for (let i = 0; i < this._getEvents().length; i++) {
      this._renderEvent(tripEventsListElement, this._getEvents()[i]);
    }
    */
    this._getEvents().forEach((item) => this._renderEvent(tripEventsListElement, item));
  }

  _renderTripEvents() {

    this._clearTripEvents();

    let currentDay = this._getEvents()[0].startDate.getDate();
    let currentDate = this._getEvents()[0].startDate;
    let countDay = 1;
    let index = 0;
    let i;

    do {
      const dayComponent = new DayView(currentDate, countDay);
      render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);

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
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripSort();
    this._renderTripDays();
    this._renderTripEvents();
  }
}
