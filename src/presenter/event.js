import EventEditView from "../view/event-edit.js";
import TripEventsItemView from "../view/trip-events-item.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {isDatesEqual} from "../utils/event.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripEventsItemComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(event) {
    this._event = event;
    //console.log(this._event);

    const prevTripEventsItemComponent = this._tripEventsItemComponent;
    //if (!prevTripEventsItemComponent) console.log(true);
    const prevEventEditComponent = this._eventEditComponent;
    //if (!prevEventEditComponent) console.log(true);
    this._tripEventsItemComponent = new TripEventsItemView(event);
    //console.log(this._tripEventsItemComponent);
    //if (!prevTripEventsItemComponent) console.log(true);
    this._eventEditComponent = new EventEditView(`edit`, event);
   // if (!this._eventEditComponent) console.log(true);
    //if (!this._tripEventsItemComponent) console.log(true);
    //console.log(`ghbdtnm`);
    this._tripEventsItemComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    //console.log(this._tripEventsItemComponent);
    if (prevTripEventsItemComponent === null || prevEventEditComponent === null) {
      //console.log(true);
      render(this._eventListContainer, this._tripEventsItemComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripEventsItemComponent, prevTripEventsItemComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevTripEventsItemComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._tripEventsItemComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._tripEventsItemComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditToEvent() {
    replace(this._tripEventsItemComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceEditToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToEdit();
  }

  _handleFormSubmit(update) {
    const isMinorUpdate =
      !isDatesEqual(this._event.startDate, update.startDate) ||
      !isDatesEqual(this._event.endDate, update.endDate) ||
      this._event.price !== update.price;

    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );

    this._replaceEditToEvent();
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }
}
