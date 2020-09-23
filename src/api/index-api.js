import EventsModel from "../model/events.js";
import OffersModel from "../model/offers.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class IndexApi {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
      .then(IndexApi.toJSON)
      .then((events) => events.map(EventsModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(IndexApi.toJSON)
      .then((offers) => OffersModel.adaptToClient(offers));
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(IndexApi.toJSON);
  }

  updateData(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(EventsModel.adaptToServer(event)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(IndexApi.toJSON)
      .then(EventsModel.adaptToClient);
  }

  addEvent(event) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(EventsModel.adaptToServer(event)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(IndexApi.toJSON)
      .then(EventsModel.adaptToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.DELETE
    });
  }

  sync(events) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(events),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(IndexApi.toJSON);
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
      .then(IndexApi.checkStatus)
      .catch(IndexApi.catchError);
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
