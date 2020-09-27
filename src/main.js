import TripTabsView from "./view/trip-tabs.js";
import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import InfoTitlePresenter from "./presenter/info-title.js";
import TripPresenter from "./presenter/trip.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType, FilterType} from "./const.js";
import StatisticsView from "./view/statistics.js";
import IndexApi from "./api/index-api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic hS2sd3dfSwcl1s169`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME_EVENTS = `${STORE_PREFIX}-EVENTS-${STORE_VER}`;
const STORE_NAME_OFFERS = `${STORE_PREFIX}-OFFERS-${STORE_VER}`;
const STORE_NAME_DESTINATIONS = `${STORE_PREFIX}-DESTINATIONS-${STORE_VER}`;

const api = new IndexApi(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME_EVENTS, STORE_NAME_OFFERS, STORE_NAME_DESTINATIONS, window.localStorage);
const apiWithProvider = new Provider(api, store);
const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const tripTabsComponent = new TripTabsView();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsElement.querySelectorAll(`h2`)[0];
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel, offersModel, destinationsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, eventsModel);
const infoTitlePresenter = new InfoTitlePresenter(tripMainElement, eventsModel);

const buttonAddNew = document.querySelector(`.trip-main__event-add-btn`);

let statisticsComponent = null;
let currentTab = `table`;

const handleEventNewFormClose = () => {
  buttonAddNew.disabled = false;
  tripTabsComponent.setMenuItem(`table`);
};

const handleSiteMenuClick = (tab) => {
  if (currentTab === tab) {
    return;
  }
  currentTab = tab;
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

tripPresenter.init();
filterPresenter.init();
infoTitlePresenter.init();

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.INIT, []);
  });

apiWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.INIT, []);
  });

apiWithProvider.getEvents()
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
