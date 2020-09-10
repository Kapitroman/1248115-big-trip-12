import TripTitleView from "../view/trip-title.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Title {
  constructor(titleContainer, eventsModel) {
    this._titleContainer = titleContainer;
    this._eventsModel = eventsModel;
  }

  init() {
    this._renderTitle();
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }

  _renderTitle() {
    if (this._getEvents().length === 0) {
      return;
    }
    render(this._titleContainer, new TripTitleView(this._getEvents()), RenderPosition.AFTERBEGIN);
  }
}
