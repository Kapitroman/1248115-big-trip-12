import {nanoid} from "nanoid";
import EventsModel from "../model/events.js";
import OffersModel from "../model/offers.js";

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (Provider.isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map(EventsModel.adaptToServer));
          this._store.setEventItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getEventItems());

    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
        .then((offer) => {
          const items = OffersModel.adaptToServer(offer);
          this._store.setOfferItems(items);
          return offer;
        });
    }

    const storeOffers = Object.values(this._store.getOfferItems());

    return Promise.resolve(OffersModel.adaptToClient(storeOffers));
  }


  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setDestinationItems(destinations);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getDestinationItems());

    return Promise.resolve(storeDestinations);
  }

  updateData(event) {
    if (Provider.isOnline()) {
      return this._api.updateData(event)
        .then((updatedDate) => {
          this._store.setEventItem(updatedDate.id, EventsModel.adaptToServer(updatedDate));
          return updatedDate;
        });
    }

    this._store.setEventItem(event.id, EventsModel.adaptToServer(Object.assign({}, event)));

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (Provider.isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._store.setEventItem(newEvent.id, EventsModel.adaptToServer(newEvent));
          return newEvent;
        });
    }

    const localNewEventId = nanoid();
    const localNewEvent = Object.assign({}, event, {id: localNewEventId});

    this._store.setEventItem(localNewEvent.id, EventsModel.adaptToServer(localNewEvent));

    return Promise.resolve(localNewEvent);
  }

  deleteEvent(event) {
    if (Provider.isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._store.removeEventItem(event.id));
    }

    this._store.removeEventItem(event.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storeEvents = Object.values(this._store.getEventItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setEventItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
