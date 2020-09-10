import TripInfoView from "./view/trip-info.js";
import TripTabsView from "./view/trip-tabs.js";
import EventsModel from "./model/events.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";
import TitlePresenter from "./presenter/title.js";
import TripPresenter from "./presenter/trip.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";

const EVENT_COUNT = 20;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);

const tpipInfoComponent = new TripInfoView(events);
render(tripMainElement, tpipInfoComponent, RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsElement.querySelectorAll(`h2`)[0];

render(switchTripViewElement, new TripTabsView(), RenderPosition.AFTEREND);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const titlePresenter = new TitlePresenter(tpipInfoComponent, eventsModel);
titlePresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
tripPresenter.init();

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, eventsModel);
filterPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
