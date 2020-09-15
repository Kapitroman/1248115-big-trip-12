import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();

    this._notify(updateType);
    console.log(this._destinations);
  }

  getDestinations() {
    return this._destinations;
  }

  /*
  static adaptToClient(destinations) {
    const adaptedDestinations = {};

    for (let i = 0; i < destinations.length; i++) {
      adaptedDestinations[destinations[i][`name`]] = {
        "description": destinations[i][`description`],
        "pictures": destinations[i][`pictures`]
      }
    }
    return adaptedDestinations;
  }

  static adaptToServer(destinations) {
    const adaptedDestinations = [];
    for (let prop in destinations) {
      adaptedDestinations.push(
        {
          "description": destinations[prop][`description`],
          "name": destinations[prop],
          "pictures": destinations[prop][`pictures`]
        }
      );
    }
    return adaptedDestinations;
  }
  */
}
