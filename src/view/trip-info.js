import {createElement, getTotalCost} from "./../utils.js";

const createTripInfoTemplate = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalCost(events)}</span>
      </p>
    </section>`
  );
};

export default class TripInfo {
  constructor(events) {
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
