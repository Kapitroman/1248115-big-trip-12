import TripInfoView from "./view/trip-info.js";
import TripTabsView from "./view/trip-tabs.js";
import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import TitlePresenter from "./presenter/title.js";
import TripPresenter from "./presenter/trip.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType, FilterType} from "./const.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic hS2sd3dfSwcl1s158`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const tpipInfoComponent = new TripInfoView(eventsModel);
const tripTabsComponent = new TripTabsView();
const api = new Api(END_POINT, AUTHORIZATION);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsElement.querySelectorAll(`h2`)[0];
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const titlePresenter = new TitlePresenter(tpipInfoComponent, eventsModel);
const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, eventsModel);

const buttonAddNew = document.querySelector(`.trip-main__event-add-btn`);

const handleEventNewFormClose = () => {
  buttonAddNew.disabled = false;
  tripTabsComponent.setMenuItem(`table`);
};

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

render(tripMainElement, tpipInfoComponent, RenderPosition.AFTERBEGIN);

titlePresenter.init();
tripPresenter.init();
filterPresenter.init();

buttonAddNew.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  evt.target.blur();
  evt.target.disabled = true;
  remove(statisticsComponent);
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();

  tripPresenter.createEvent(handleEventNewFormClose);
});

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.INIT, []);
 });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.INIT, []);
 });

api.getEvents()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
    render(switchTripViewElement, tripTabsComponent, RenderPosition.AFTEREND);
    tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    render(switchTripViewElement, tripTabsComponent, RenderPosition.AFTEREND);
    tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);
  });
