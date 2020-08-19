import {getFormatDate} from "./../utils/event.js";
import AbstractView from "./abstract.js";

const createTripTitleTemplate = (events) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${events[0].destination} &mdash; ... &mdash; ${events[events.length - 1].destination} </h1>
      <p class="trip-info__dates">${getFormatDate(events[0].date[0])}&nbsp;&mdash;&nbsp;${getFormatDate(events[events.length - 1].date[1])}</p>
    </div>`
  );
};

export default class TripTitle extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripTitleTemplate(this._events);
  }
}
