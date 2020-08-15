import TripInfoView from "./view/trip-info.js";
import TripTitleView from "./view/trip-title.js";
import TripTabsView from "./view/trip-tabs.js";
import TripFiltersView from "./view/trip-filters.js";
import TripSortView from "./view/trip-sort.js";
import EventEditView from "./view/event-edit.js";
import TripDaysView from "./view/trip-days.js";
import DayView from "./view/day.js";
import TripEventsItemView from "./view/trip-events-item.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripMainElement = document.querySelector(`.trip-main`);

const tpipInfoComponent = new TripInfoView(events);
render(tripMainElement, tpipInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tpipInfoComponent.getElement(), new TripTitleView(events).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsElement.querySelectorAll(`h2`)[0];

render(switchTripViewElement, new TripTabsView().getElement(), RenderPosition.AFTEREND);
render(tripControlsElement, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

const tripDaysComponent = new TripDaysView();
render(tripEventsElement, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

const renderEvent = (eventListElement, event) => {
  const tripEventsItemComponent = new TripEventsItemView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToEdit = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), tripEventsItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    eventListElement.replaceChild(tripEventsItemComponent.getElement(), eventEditComponent.getElement());
  };

  tripEventsItemComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEdit();
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  render(eventListElement, tripEventsItemComponent.getElement(), RenderPosition.BEFOREEND);
};

let currentDay = events[0].date[0].getDate();
let currentDate = events[0].date[0];
let countDay = 1;
let index = 0;
let i;

do {
  const dayComponent = new DayView(currentDate, countDay);
  render(tripDaysComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);

  const tripEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

  for (i = index; i < events.length; i++) {

    if (events[i].date[0].getDate() === currentDay) {
      renderEvent(tripEventsListElement, events[i]);
    } else {
      currentDay = events[i].date[0].getDate();
      currentDate = events[i].date[0];
      countDay++;
      index = i;
      break;
    }
  }
} while (i < events.length);
