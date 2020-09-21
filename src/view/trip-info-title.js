import {getTotalCost} from "./../utils/common.js";
import {getFormatDate} from "./../utils/event.js";
import AbstractView from "./abstract.js";

const createTripInfoTitleTemplate = (events) => {

  const createTripTitleTemplate = () => {
    if (events.length) {

      return (
        `<div class="trip-info__main">
          <h1 class="trip-info__title">${events[0].destination[`name`]} &mdash; ... &mdash; ${events[events.length - 1].destination[`name`]} </h1>
          <p class="trip-info__dates">${getFormatDate(events[0].startDate)}&nbsp;&mdash;&nbsp;${getFormatDate(events[events.length - 1].endDate)}</p>
        </div>`
      );
    }
    return ``;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${createTripTitleTemplate()}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalCost(events)}</span>
      </p>
    </section>`
  );
};

export default class TripInfoTitle extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  _getEvents() {
    return this._events;
  }

  getTemplate() {
    return createTripInfoTitleTemplate(this._getEvents());
  }
}
