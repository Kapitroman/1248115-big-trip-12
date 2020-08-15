import {createElement, getFormatDate} from "./../utils.js";

const createTripTitleTemplate = (events) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${events[0].destination} &mdash; ... &mdash; ${events[events.length - 1].destination} </h1>
      <p class="trip-info__dates">${getFormatDate(events[0].date[0])}&nbsp;&mdash;&nbsp;${getFormatDate(events[events.length - 1].date[1])}</p>
    </div>`
  );
};

export default class TripTitle {
  constructor(events) {
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createTripTitleTemplate(this._events);
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
