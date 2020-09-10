import {DESTINATIONS, PLACEHOLDER} from "./../const.js";
import {typesOffers} from "../mock/types-offers.js";
import {descriptionDestinations} from "../mock/destination.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const getDestinations = (listDestinations) => {

  return listDestinations.map((item) => `<option value="${item}"></option>`).join(``);
};

const BLANK_EVENT = {
  type: `Bus`,
  destination: ``,
  startDate: new Date(),
  endDate: new Date(),
  cost: 0,
  offers: typesOffers[`Bus`],
  isFavorite: false
};

const createEventEditActionTemplate = (action, id, isCheckFavorite) => {

  if (action === `edit`) {
    const checked = () => {
      if (isCheckFavorite) {
        return `checked`;
      }
      return ``;
    };

    return (
      `<button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-${id}" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${checked()}>
      <label class="event__favorite-btn" for="event-favorite-${id}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    );
  } else {
    return (
      `<button class="event__reset-btn" type="reset">Cancel</button>`
    );
  }
};

const createEventDetailsTemplate = (data) => {

  const {type} = data;

  if (typesOffers[type].length !== 0 ||
    descriptionDestinations[data[`destination`]][`description`] ||
    descriptionDestinations[data[`destination`]][`photos`]) {

    return (
      `<section class="event__details">
      ${createEventOffersTemplate(data)}
      ${createEventDestinationTemplate(data)}

    </section>`
    );
  } else {

    return ``;
  }
};

const createEventOffersTemplate = (data) => {

  const {type, offers} = data;

  if (typesOffers[type].length !== 0) {

    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createEventOfferItemsTemplate(typesOffers[type], offers)}
        </div>
      </section>`
    );
  } else {

    return ``;
  }
};

const createEventOfferItemsTemplate = (arrayTypeOffer, eventOffers) => {

  const checkOffer = (offerItem, checkedOffer) => {
    if (checkedOffer.some((it) => it[`title`] === offerItem[`title`])) {
      return `checked`;
    }
    return ``;
  };

  return arrayTypeOffer.map((item) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item[`typeOffer`]}-1" type="checkbox" data-title="${item[`title`]}" name="event-offer-${item[`typeOffer`]}" ${checkOffer(item, eventOffers)}>
      <label class="event__offer-label" for="event-offer-${item[`typeOffer`]}-1">
        <span class="event__offer-title">${item[`title`]}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item[`cost`]}</span>
      </label>
    </div>`).join(``);
};

const createEventDestinationTemplate = (data) => {
  const {destination} = data;

  if ((destination && descriptionDestinations[data[`destination`]][`description`]) || (destination && descriptionDestinations[data[`destination`]][`photos`])) {

    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${descriptionDestinations[destination][`description`]}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${descriptionDestinations[destination][`photos`]}
          </div>
        </div>
      </section>`
    );
  } else {

    return ``;
  }
};

const createEventEditTemplate = (action, data) => {
  const {type, destination, startDate, endDate, cost, id, isCheckFavorite} = data;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type.toLowerCase()} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${PLACEHOLDER[type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getDestinations(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${createEventEditActionTemplate(action, id, isCheckFavorite)}
      </header>

      ${createEventDetailsTemplate(data)}

    </form>`
  );
};

export default class EventEdit extends SmartView {
  constructor(action, event = BLANK_EVENT) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._datepicker = null;
    this._action = action;

    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._offerInputHandler = this._offerInputHandler.bind(this);
    this._typeInputHandler = this._typeInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._favoriteInputHandler = this._favoriteInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

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
    return createEventEditTemplate(this._action, this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

  _favoriteInputHandler(evt) {
    evt.preventDefault();

    this.updateData(
        {
          isFavorite: !this._data.isFavorite,
          isCheckFavorite: !this._data.isCheckFavorite
        }
    );
  }

  _typeInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      offers: []
    }, true);
    this.updateData({
      type: `${evt.target.value[0].toUpperCase()}${evt.target.value.slice(1)}`
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      cost: evt.target.value
    }, true);
  }

  _offerInputHandler(evt) {
    evt.preventDefault();
    let title = evt.target.dataset.title;
    const listTypesOffers = typesOffers[this._data.type];
    let listOffers = this._data.offers;
    let index = listTypesOffers.findIndex((item) => item[`title`] === title);
    if (evt.target.checked) {
      listOffers.push(listTypesOffers[index]);
    } else {
      listOffers = listOffers.filter((item) => item[`title`] !== title);
    }
    this.updateData({
      offers: listOffers
    });
  }

  _dueDateChangeHandler(userDate, strDate, fp) {
    if (fp === this._datepicker[0]) {
      this.updateData({
        startDate: userDate[0]
      });
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

    if (typesOffers[this._data.type].length !== 0) {
      this.getElement()
      .querySelector(`.event__available-offers`)
      .addEventListener(`change`, this._offerInputHandler);
    }

    if (this._action === `edit`) {
      this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteInputHandler);
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

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isCheckFavorite: event.isFavorite,
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isCheckFavorite;

    return data;
  }
}
