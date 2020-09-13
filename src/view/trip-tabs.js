import AbstractView from "./abstract.js";

const createTripTabsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" data-view="table" href="#">Table</a>
      <a class="trip-tabs__btn" data-view="stats" href="#">Stats</a>
    </nav>`
  );
};

export default class TripTabs extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripTabsTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.view);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(tab) {
    const item = this.getElement().querySelector(`[data-view="${tab}"]`);
    const tabs = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains(`trip-tabs__btn--active`)) {
        tabs[i].classList.remove(`trip-tabs__btn--active`);
      }
    }
    item.classList.add(`trip-tabs__btn--active`);
  }

}
