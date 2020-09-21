import TripInfoTitleView from "../view/trip-info-title.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class InfoTitle {
  constructor(infoTitleContainer, eventsModel) {
    this._infoTitleContainer = infoTitleContainer;
    this._eventsModel = eventsModel;

    this._infoTitleComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTitle();
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }

  _renderTitle() {

    const prevInfoTitleComponent = this._infoTitleComponent;
    this._infoTitleComponent = new TripInfoTitleView(this._getEvents());

    if (prevInfoTitleComponent === null) {
      render(this._infoTitleContainer, this._infoTitleComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._infoTitleComponent, prevInfoTitleComponent);
    remove(prevInfoTitleComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
