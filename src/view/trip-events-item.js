import {getShortTime, getFullTime, durationTime} from "./../utils/event.js";
import AbstractView from "./abstract.js";
import {PLACEHOLDER} from "./../const.js";

const createEventOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createTripEventsItemTemplate = (event) => {
  const {type, destination, startDate, endDate, offers, price} = event;

  const renderOffers = () => {
    const listEventOffers = [];
    for (let y = 0; y < Math.min(offers.length, 3); y++) {
      listEventOffers.push(createEventOfferTemplate(offers[y]));
    }
    return listEventOffers.join(``);
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type[0].toUpperCase()}${type.slice(1)} ${PLACEHOLDER[type]} ${destination[`name`]} </h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getFullTime(startDate)}">${getShortTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getFullTime(endDate)}">${getShortTime(endDate)}</time>
          </p>
          <p class="event__duration">${durationTime(endDate, startDate)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${renderOffers()}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEventsItem extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventsItemTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
