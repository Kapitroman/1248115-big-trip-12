import TripTitleView from "../view/trip-title.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Title {
  constructor(titleContainer) {
    this._titleContainer = titleContainer;
  }

  init(tripEvents) {
    this._tripEvents = tripEvents;
    this._renderTitle();
  }

  _renderTitle() {
    if (this._tripEvents.length === 0) {
      return;
    }
    render(this._titleContainer, new TripTitleView(this._tripEvents), RenderPosition.AFTERBEGIN);
  }
}
