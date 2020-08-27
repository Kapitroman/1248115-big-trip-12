import NoEventView from "../view/no-event.js";
import TripSortView from "../view/trip-sort.js";
import EventEditView from "../view/event-edit.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import TripEventsItemView from "../view/trip-events-item.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {sortTime, sortPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripSortComponent = new TripSortView();
    this._tripDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

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

  _renderEvent(eventListElement, event) {
    const tripEventsItemComponent = new TripEventsItemView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceEventToEdit = () => {
      replace(eventEditComponent, tripEventsItemComponent);
    };

    const replaceEditToEvent = () => {
      replace(tripEventsItemComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripEventsItemComponent.setEditClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, tripEventsItemComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTripEvents() {
    this._tripDaysComponent.getElement().innerHTML = ``;
  }

  _renderTripSort() {
    render(this._tripContainer, this._tripSortComponent, RenderPosition.BEFOREEND);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripDays() {
    render(this._tripContainer, this._tripDaysComponent, RenderPosition.BEFOREEND);
    this._clearTripEvents();
  }

  _renderTripEventsSort() {
    this._renderTripDays();
    const dayComponent = new DayView(null, 0);
    render(this._tripDaysComponent, dayComponent, RenderPosition.BEFOREEND);
    const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
    for (let i = 0; i < this._tripEvents.length; i++) {
      this._renderEvent(tripEventsListElement, this._tripEvents[i]);
    }
  }

  _renderTripEvents() {

    this._renderTripDays();

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
    this._renderTripEvents();
  }

}
