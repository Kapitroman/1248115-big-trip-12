import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripTitleTemplate} from "./view/trip-title.js";
import {createTripTabsTemplate} from "./view/trip-tabs.js";
import {createTripFiltersTemplate} from "./view/trip-filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventDetailsTemplate} from "./view/event-details.js";
import {createEventDestinationTemplate} from "./view/event-destination.js";
import {createTripDaysTemplate} from "./view/trip-days.js";
import {createDayTemplate} from "./view/day.js";
import {createTripEventsItemTemplate} from "./view/trip-events-item.js";

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

if (tripInfoElement) {
  render(tripInfoElement, createTripTitleTemplate(), `afterbegin`);
}

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsElement.querySelectorAll(`h2`)[0];

render(switchTripViewElement, createTripTabsTemplate(), `afterend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createEventEditTemplate(), `beforeend`);

const eventEditElement = tripEventsElement.querySelector(`.event--edit`);

if (eventEditElement) {
  const eventDetailsElement = eventEditElement.querySelector(`.event__details`);
  render(eventDetailsElement, createEventDetailsTemplate(), `beforeend`);
  render(eventDetailsElement, createEventDestinationTemplate(), `beforeend`);
}

render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

if (tripDaysElement) {
  render(tripDaysElement, createDayTemplate(), `beforeend`);

  const tripEventsListElement = tripDaysElement.querySelector(`.trip-events__list`);

  if (tripEventsListElement) {

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(tripEventsListElement, createTripEventsItemTemplate(), `beforeend`);
    }
  }
}
