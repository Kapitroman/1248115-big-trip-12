import {PLACEHOLDER, EditComponentType} from "./../const.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  type: `bus`,
  destination: ``,
  startDate: new Date(),
  endDate: new Date(),
  price: 0,
  offers: [],
  isFavorite: false
};

const createEventEditActionTemplate = (action, id, isCheckFavorite, isDisabled, isDeleting) => {

  return action === EditComponentType.EDIT
    ?
    `<button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isDeleting ? `Deleting...` : `Delete`}</button>

    <input id="event-favorite-${id}" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${isCheckFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
    <label class="event__favorite-btn" for="event-favorite-${id}">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
    :
    `<button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isDeleting ? `Canceling...` : `Cancel`}</button>`;
};

const createEventDetailsTemplate = (data, listOffers) => {

  const {type, destination, isDisabled} = data;

  return (listOffers[type].length || destination[`description`] || destination[`pictures`])
    ?
    `<section class="event__details">
      ${createEventOffersTemplate(data, listOffers, isDisabled)}
      ${createEventDestinationTemplate(data)}
    </section>`
    :
    ``;
};

const createEventOffersTemplate = (data, listOffers, isDisabled) => {

  const {type, offers} = data;

  return listOffers[type].length
    ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createEventOfferItemsTemplate(listOffers[type], offers, isDisabled)}
      </div>
    </section>`
    :
    ``;
};

const createEventOfferItemsTemplate = (arrayTypeOffer, eventOffers, isDisabled) => {

  const checkOffer = (offerItem, checkedOffer) => {
    return (checkedOffer.some((it) => it[`title`] === offerItem[`title`]))
      ? `checked` : ``;
  };

  const generateIdInput = (string) => {
    return string.split(` `).join(``);
  };

  return arrayTypeOffer.map((item) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${generateIdInput(item[`title`])}" type="checkbox" data-title="${item[`title`]}" name="event-offer-${generateIdInput(item[`title`])}" ${checkOffer(item, eventOffers)} ${isDisabled ? `disabled` : ``}>
      <label class="event__offer-label" for="event-offer-${generateIdInput(item[`title`])}">
        <span class="event__offer-title">${item[`title`]}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item[`price`]}</span>
      </label>
    </div>`).join(``);
};

const createEventDestinationTemplate = (data) => {
  const {destination} = data;

  const getStringPhotos = () => {
    const listPictures = destination[`pictures`];
    const listStringPictures = [];
    listPictures.forEach((item) => listStringPictures.push(
        `<img class="event__photo" src="${item[`src`]}" alt="${item[`description`]}"></img>`
    ));
    return listStringPictures.join(` `);
  };

  return (destination && destination[`description`] || destination && destination[`pictures`])
    ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination[`description`]}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${getStringPhotos()}
        </div>
      </div>
    </section>`
    :
    ``;
};

const createEventEditTemplate = (action, data, listOffers, listDestinations) => {
  const {type, destination, startDate, endDate, price, id, isCheckFavorite, isDisabled, isSaving, isDeleting} = data;

  const getListDestinations = () => {

    return listDestinations.map((item) => `<option value="${item[`name`]}"></option>`).join(``);

  };

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === `taxi` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === `bus` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === `train` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === `ship` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type === `transport` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === `drive` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === `flight` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === `check-in` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === `sightseeing` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === `restaurant` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type[0].toUpperCase()}${type.slice(1)} ${PLACEHOLDER[type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination[`name`] : ``}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
          <datalist id="destination-list-1">
            ${getListDestinations()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}" ${isDisabled ? `disabled` : ``}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}" ${isDisabled ? `disabled` : ``}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" ${isDisabled ? `disabled` : ``}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
        ${createEventEditActionTemplate(action, id, isCheckFavorite, isDisabled, isDeleting)}
      </header>

      ${createEventDetailsTemplate(data, listOffers, isDisabled)}

    </form>`
  );
};

export default class EventEdit extends SmartView {
  constructor(action, event = BLANK_EVENT, offers, destinations) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._datepicker = null;
    this._action = action;
    this._offers = offers;
    this._destinations = destinations;

    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._offerInputHandler = this._offerInputHandler.bind(this);
    this._typeInputHandler = this._typeInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formFavoriteClickHandler = this._formFavoriteClickHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker[0].destroy();
      this._datepicker[1].destroy();
      this._datepicker = null;
    }
  }

  reset(event) {
    this.updateData(
        EventEdit.parseEventToData(event)
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._action, this._data, this._offers, this._destinations);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.forEach((item) => item.destroy());
      this._datepicker = null;
    }

    const calendarStart = flatpickr(
        this.getElement().querySelectorAll(`.event__input--time`)[0],
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.startDate,
          onChange: this._dueDateChangeHandler
        }
    );

    const calendarEnd = flatpickr(
        this.getElement().querySelectorAll(`.event__input--time`)[1],
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.endDate,
          minDate: this._data.startDate,
          onChange: this._dueDateChangeHandler
        }
    );

    this._datepicker = [calendarStart, calendarEnd];
  }

  _typeInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      offers: []
    }, true);
    this.updateData({
      type: `${evt.target.value}`
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const index = evt.target.value;
    let apdatedDistination;
    for (let i = 0; i < this._destinations.length; i++) {
      if (this._destinations[i][`name`] === index) {
        apdatedDistination = this._destinations[i];
        break;
      }
    }
    this.updateData({
      destination: apdatedDistination
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: Number(evt.target.value)
    }, true);
  }

  _offerInputHandler(evt) {
    evt.preventDefault();
    const title = evt.target.dataset.title;
    const listTypesOffers = this._offers[this._data.type];
    let listItemOffers = this._data.offers;
    const index = listTypesOffers.findIndex((item) => item[`title`] === title);
    if (evt.target.checked) {
      listItemOffers.push(listTypesOffers[index]);
    } else {
      listItemOffers = listItemOffers.filter((item) => item[`title`] !== title);
    }
    this.updateData({
      offers: listItemOffers
    });
  }

  _dueDateChangeHandler(userDate, strDate, fp) {
    if (fp === this._datepicker[0]) {
      if (+userDate[0] > +new Date(this._data.endDate)) {
        this.updateData({
          startDate: userDate[0],
          endDate: userDate[0]
        });
      } else {
        this.updateData({
          startDate: userDate[0],
        });
      }
    } else {
      this.updateData({
        endDate: userDate[0]
      });
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationInputHandler);

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeInputHandler);

    if (this._offers[this._data.type].length) {
      this.getElement()
      .querySelector(`.event__available-offers`)
      .addEventListener(`change`, this._offerInputHandler);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _formFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._data.isCheckFavorite = !this._data.isCheckFavorite;
    this._callback.favoriteClick(
        {
          isFavorite: !this._data.isFavorite,
        }
    );
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    if (this._action === EditComponentType.EDIT) {
      this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._formFavoriteClickHandler);
    }
  }

  _formCloseClickHandler() {
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    if (this._action === EditComponentType.EDIT) {
      this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._formCloseClickHandler);
    }
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isCheckFavorite: event.isFavorite,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isCheckFavorite;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
