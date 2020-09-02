import EventEditView from "../view/event-edit.js";
import TripEventsItemView from "../view/trip-events-item.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Event {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._tripEventsItemComponent = null;
    this._eventEditComponent = null;

    //this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(event) {
    this._event = event;

    const prevTripEventsItemComponent = this._tripEventsItemComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._tripEventsItemComponent = new TripEventsItemView(event);
    this._eventEditComponent = new EventEditView(event);

    //this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripEventsItemComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripEventsItemComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._tripEventsItemComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventListContainer.contains(prevTripEventsItemComponent.getElement())) {
      replace(this._tripEventsItemComponent, prevTripEventsItemComponent);
    }

    if (this._eventListContainer.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevTripEventsItemComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._tripEventsItemComponent);
    remove(this._eventEditComponent);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._tripEventsItemComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  };

  _replaceEditToEvent () {
    replace(this._tripEventsItemComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  };

  _onEscKeyDown (evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceEditToEvent();
    }
  }

/*
  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }
*/

  _handleEditClick() {
    this._replaceEventToEdit();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceEditToEvent();
  }
}
