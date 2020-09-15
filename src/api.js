import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
//import DestinationsModel from "./model/destinations.js";

const Method = {
    GET: `GET`,
    PUT: `PUT`
  };

  const SuccessHTTPStatusRange = {
    MIN: 200,
    MAX: 299
  };

  export default class Api {
    constructor(endPoint, authorization) {
      this._endPoint = endPoint;
      this._authorization = authorization;
    }

    getEvents() {
      return this._load({url: `points`})
        .then(Api.toJSON)
        .then((events) => events.map((item) => EventsModel.adaptToClient(item)));
    }

    getOffers() {
      return this._load({url: `offers`})
        .then(Api.toJSON)
        .then((offers) => OffersModel.adaptToClient(offers));
    }

    getDestinations() {
      return this._load({url: `destinations`})
        .then(Api.toJSON);
        //.then((destinations) => DestinationsModel.adaptToClient(destinations));
    }
/*
    getDestinations() {
      return this._load({url: `destinations`})
        .then(Api.toJSON)
        .then((destinations) => destinations.map(DestinationsModel.adaptToClient));
    }
*/
    updateData(event) {
      return this._load({
        url: `points/${event.id}`,
        method: Method.PUT,
        body: JSON.stringify(EventsModel.adaptToServer(event)),
        headers: new Headers({"Content-Type": `application/json`})
      })
        .then(Api.toJSON)
        .then(EventsModel.adaptToClient);
    }

    _load({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers()
    }) {
      headers.append(`Authorization`, this._authorization);

      return fetch(
          `${this._endPoint}/${url}`,
          {method, body, headers}
      )
        .then(Api.checkStatus)
        .catch(Api.catchError);
    }

    static checkStatus(response) {
      if (
        response.status < SuccessHTTPStatusRange.MIN &&
        response.status > SuccessHTTPStatusRange.MAX
      ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    }

    static toJSON(response) {
      return response.json();
    }

    static catchError(err) {
      throw err;
    }
  }
