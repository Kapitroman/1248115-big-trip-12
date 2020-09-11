import TripInfoView from "./view/trip-info.js";
import TripTabsView from "./view/trip-tabs.js";
import EventsModel from "./model/events.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";
import TitlePresenter from "./presenter/title.js";
import TripPresenter from "./presenter/trip.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType, FilterType} from "./const.js";
//import {MenuItem} from "./const.js";

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

const handleSiteMenuClick = (tab) => {
  switch (tab) {
    /*
    case MenuItem.ADD_NEW_EVENT:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    */
    case `table`:
      // Показать доску
      tripPresenter.init();
      tripTabsComponent.setMenuItem(`table`);
      // Скрыть статистику
      break;
    case `stats`:
      // Скрыть доску
      tripPresenter.destroy();
      tripTabsComponent.setMenuItem(`stats`);
      // Показать статистику
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
  //buttonAddNew.setAttribute(`disabled`, ``);
  evt.target.blur();
  evt.target.disabled = true;
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  //boardPresenter.createTask(handleTaskNewFormClose);
  //siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;

  tripPresenter.createEvent(handleTaskNewFormClose);

});
