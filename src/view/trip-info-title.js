import {getTotalCost} from "./../utils/common.js";
import {getFormatDate} from "./../utils/event.js";
import AbstractView from "./abstract.js";

const createTripInfoTitleTemplate = (events) => {

  const createTripTitleTemplate = () => {
    if (events.length) {
      const getEventDestinations = () => {
        if (events.length < 3) {
          return `${events[0].destination[`name`]} &mdash; ${events[events.length - 1].destination[`name`]}`;
        }
        if (events.length === 3) {
          return `${events[0].destination[`name`]} &mdash; ${events[1].destination[`name`]} &mdash; ${events[events.length - 1].destination[`name`]}`;
        }
        return `${events[0].destination[`name`]} &mdash; ... &mdash; ${events[events.length - 1].destination[`name`]}`;
      };

      const getEventDates = () => {
        if (events.length === 1) {
          return `${getFormatDate(events[events.length - 1].endDate)}`;
        }
        return `${getFormatDate(events[0].startDate)}&nbsp;&mdash;&nbsp;${getFormatDate(events[events.length - 1].endDate)}`;
      };

      return (
        `<div class="trip-info__main">
          <h1 class="trip-info__title">${getEventDestinations()} </h1>
          <p class="trip-info__dates">${getEventDates()}</p>
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
