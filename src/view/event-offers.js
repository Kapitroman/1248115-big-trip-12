import {typesOffers} from "../mock/types-offers.js";

export const createEventOffersTemplate = (event = {}) => {
  const {
    type = `Bus`,
  } = event;
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${typesOffers[type][0][0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${typesOffers[type][0][1]}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">${typesOffers[type][1][0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${typesOffers[type][1][1]}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
          <label class="event__offer-label" for="event-offer-meal-1">
            <span class="event__offer-title">${typesOffers[type][2][0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${typesOffers[type][2][1]}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
          <label class="event__offer-label" for="event-offer-seats-1">
            <span class="event__offer-title">${typesOffers[type][3][0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${typesOffers[type][3][1]}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
          <label class="event__offer-label" for="event-offer-train-1">
            <span class="event__offer-title">${typesOffers[type][4][0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${typesOffers[type][4][1]}</span>
          </label>
        </div>
      </div>
    </section>`
  );
};
