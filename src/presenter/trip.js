import NoEventView from "../view/no-event.js";
import TripSortView from "../view/trip-sort.js";
import EventEditView from "../view/event-edit.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import TripEventsItemView from "../view/trip-events-item.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripSortComponent = new TripSortView();
    this._tripDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._renderTrip();
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

  _renderTripSort() {
    render(this._tripContainer, this._tripSortComponent, RenderPosition.BEFOREEND);
  }

  _renderTripDays() {
    render(this._tripContainer, this._tripDaysComponent, RenderPosition.BEFOREEND);
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
