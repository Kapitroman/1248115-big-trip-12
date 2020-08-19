import {getTotalCost} from "./../utils/common.js";
import AbstractView from "./abstract.js";

const createTripInfoTemplate = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalCost(events)}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
