import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = {};
  }

  setOffers(updateType, offers) {
    this._offers = offers;
    console.log(this._offers);
    this._notify(updateType);
  }

  getOffers() {

    return this._offers;
  }

  static adaptToClient(offers) {
    const adaptedOffers = {};
    for (let i = 0; i < offers.length; i++) {
      adaptedOffers[offers[i][`type`]] = offers[i][`offers`]
    }
    return adaptedOffers;
  }

  static adaptToServer(offers) {
    const adaptedOffers = [];
    for (let prop in offers) {
      adaptedOffers.push(
        {
          "type": prop,
          "offers": offers[prop]
        }
      );
    }
    return adaptedOffers;
  }
}
