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
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};

    this._tripSortComponent = new TripSortView();
    this._tripDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

    this._renderTrip();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortPrice);
        break;
      case SortType.DEFAULT:
        this._tripEvents = this._sourcedTripEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);

    if (sortType === SortType.DEFAULT) {
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
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
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
    for (let i = 0; i < this._tripEvents.length; i++) {
      this._renderEvent(tripEventsListElement, this._tripEvents[i]);
    }
  }

  _renderTripEvents() {

    this._clearTripEvents();

    let currentDay = this._tripEvents[0].date[0].getDate();
    let currentDate = this._tripEvents[0].date[0];
    let countDay = 1;
    let index = 0;
    let i;

    do {
      const dayComponent = new DayView(currentDate, countDay);
      render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);

      const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

      for (i = index; i < this._tripEvents.length; i++) {

        if (this._tripEvents[i].date[0].getDate() === currentDay) {
          this._renderEvent(tripEventsListElement, this._tripEvents[i]);
        } else {
          currentDay = this._tripEvents[i].date[0].getDate();
          currentDate = this._tripEvents[i].date[0];
          countDay++;
          index = i;
          break;
        }
      }
    } while (i < this._tripEvents.length);
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripSort();
    this._renderTripDays();
    this._renderTripEvents();
  }
}
