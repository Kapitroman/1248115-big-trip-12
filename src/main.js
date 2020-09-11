import TripInfoView from "./view/trip-info.js";
import TripTabsView from "./view/trip-tabs.js";
import EventsModel from "./model/events.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import TitlePresenter from "./presenter/title.js";
import TripPresenter from "./presenter/trip.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType, FilterType} from "./const.js";
import StatisticsView from "./view/statistics.js";

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

const tripTabsComponent = new TripTabsView();
render(switchTripViewElement, tripTabsComponent, RenderPosition.AFTEREND);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const titlePresenter = new TitlePresenter(tpipInfoComponent, eventsModel);
titlePresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
tripPresenter.init();

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, eventsModel);
filterPresenter.init();

let statisticsComponent = null;

const handleSiteMenuClick = (tab) => {
  switch (tab) {
    case `table`:
      tripPresenter.init();
      tripTabsComponent.setMenuItem(`table`);
      remove(statisticsComponent);
      break;
    case `stats`:
      tripPresenter.destroy();
      tripTabsComponent.setMenuItem(`stats`);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
      break;
  }
};

tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);

const buttonAddNew = document.querySelector(`.trip-main__event-add-btn`);

const handleTaskNewFormClose = () => {
  buttonAddNew.disabled = false;
  tripTabsComponent.setMenuItem(`table`);
};

buttonAddNew.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  evt.target.blur();
  evt.target.disabled = true;
  remove(statisticsComponent);
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();

  tripPresenter.createEvent(handleTaskNewFormClose);

});
