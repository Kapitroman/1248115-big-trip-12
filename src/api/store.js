export default class Store {
  constructor(keyEvents, keyOffers, keyDestinations, storage) {
    this._storage = storage;
    this._storeKeyEvents = keyEvents;
    this._storeKeyOffers = keyOffers;
    this._storeKeyDestinations = keyDestinations;
  }

  getEventItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKeyEvents)) || {};
    } catch (err) {
      return {};
    }
  }

  getOfferItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKeyOffers)) || {};
    } catch (err) {
      return {};
    }
  }

  getDestinationItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKeyDestinations)) || {};
    } catch (err) {
      return {};
    }
  }

  setEventItems(items) {
    this._storage.setItem(
        this._storeKeyEvents,
        JSON.stringify(items)
    );
  }

  setOfferItems(item) {
    this._storage.setItem(
        this._storeKeyOffers,
        JSON.stringify(item)
    );
  }

  setDestinationItems(items) {
    this._storage.setItem(
        this._storeKeyDestinations,
        JSON.stringify(items)
    );
  }

  setEventItem(key, value) {
    const store = this.getEventItems();

    this._storage.setItem(
        this._storeKeyEvents,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeEventItem(key) {
    const store = this.getEventItems();

    delete store[key];

    this._storage.setItem(
        this._storeKeyEvents,
        JSON.stringify(store)
    );
  }
}
