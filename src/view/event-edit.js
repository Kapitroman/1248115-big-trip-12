import {getFormatEditTime} from "./../utils/event.js";
import {DESTINATIONS} from "./../const.js";
import {typesOffers} from "../mock/types-offers.js";
import {descriptionDestinations} from "../mock/destination.js";
import AbstractView from "./abstract.js";

const getDestinations = (listDestinations) => {

  return listDestinations.map((item) => `<option value="${item}"></option>`).join(``);
};

const BLANK_EVENT = {
  type: `Bus`,
  destination: ``,
  date: [new Date(), new Date()],
  cost: 0,
  action: `add`,
  offers: typesOffers[`Bus`],
  isFavorite: false
};

const createEventEditActionTemplate = (action) => {
  if (action === `edit`) {

    return (
      `<button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
      <label class="event__favorite-btn" for="event-favorite-1">
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

const createEventDetailsTemplate = (event) => {

  const {type} = event;

  if (typesOffers[type].length !== 0 ||
    descriptionDestinations[event[`destination`]][`description`] ||
    descriptionDestinations[event[`destination`]][`photos`]) {

    return (
      `<section class="event__details">
      ${createEventOffersTemplate(event)}
      ${createEventDestinationTemplate(event)}

    </section>`
    );
  } else {

    return ``;
  }
};

const createEventOffersTemplate = (event) => {

  const {type} = event;

  if (typesOffers[type].length !== 0) {

    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createEventOfferItemsTemplate(typesOffers[type])}
        </div>
      </section>`
    );
  } else {

    return ``;
  }
};

const createEventOfferItemsTemplate = (arrayTypeOffer) => {

  return arrayTypeOffer.map((item) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item[`typeOffer`]}-1" type="checkbox" name="event-offer-${item[`typeOffer`]}" checked>
      <label class="event__offer-label" for="event-offer-${item[`typeOffer`]}-1">
        <span class="event__offer-title">${item[`title`]}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item[`cost`]}</span>
      </label>
    </div>`).join(``);
};

const createEventDestinationTemplate = (event) => {
  const {destination} = event;

  if (descriptionDestinations[event[`destination`]][`description`] || descriptionDestinations[event[`destination`]][`photos`]) {

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

const createEventEditTemplate = (event) => {
  const {type, destination, date, cost, action} = event;

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
            ${type} to
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatEditTime(date[0])}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatEditTime(date[1])}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${createEventEditActionTemplate(action)}
      </header>

      ${createEventDetailsTemplate(event)}

    </form>`
  );
};

export default class EventEdit extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._event = event;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }
}
