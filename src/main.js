import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripTitleTemplate} from "./view/trip-title.js";
import {createTripTabsTemplate} from "./view/trip-tabs.js";
import {createTripFiltersTemplate} from "./view/trip-filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventOffersTemplate} from "./view/event-offers.js";
import {createEventDestinationTemplate} from "./view/event-destination.js";
import {createTripDaysTemplate} from "./view/trip-days.js";
import {createDayTemplate} from "./view/day.js";
import {createTripEventsItemTemplate} from "./view/trip-events-item.js";
import {createEventOfferTemplate} from "./view/event-offer.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoTemplate(events), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripTitleTemplate(events), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsElement.querySelectorAll(`h2`)[0];

render(switchTripViewElement, createTripTabsTemplate(), `afterend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createEventEditTemplate(events[0]), `beforeend`);

const eventEditElement = tripEventsElement.querySelector(`.event--edit`);
const eventDetailsElement = eventEditElement.querySelector(`.event__details`);

render(eventDetailsElement, createEventOffersTemplate(events[0]), `beforeend`);
render(eventDetailsElement, createEventDestinationTemplate(), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

let currentDay = events[1].date[0].getDate();
const lastDay = events[events.length - 1].date[0].getDate();
let currentData = events[1].date[0];
let countDay = 1;
let index = 1;

do {
  render(tripDaysElement, createDayTemplate(currentData, countDay), `beforeend`);

  const tripEventsListElements = tripDaysElement.querySelectorAll(`.trip-events__list`);
  const tripEventsListElement = tripEventsListElements[tripEventsListElements.length - 1];

  for (let i = index; i < events.length; i++) {

    if (events[i].date[0].getDate() === currentDay) {
      render(tripEventsListElement, createTripEventsItemTemplate(events[i]), `beforeend`);

      const eventSelectedOffersElements = tripDaysElement.querySelectorAll(`.event__selected-offers`);
      const eventSelectedOffersElement = eventSelectedOffersElements[eventSelectedOffersElements.length - 1];
      for (let y = 0; y < Math.min(events[i].offers.length, 3); y++) {
        render(eventSelectedOffersElement, createEventOfferTemplate(events[i].offers[y]), `beforeend`);
      }

    } else {
      currentDay = events[i].date[0].getDate();
      currentData = events[i].date[0];
      countDay++;
      index = i;
      break;
    }
  }
} while (currentDay !== lastDay);
