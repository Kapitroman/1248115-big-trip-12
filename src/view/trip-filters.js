import AbstractView from "./abstract.js";

const createTripFilterItemTemplate = (filter, currentFilterType, events) => {
  const {type, name} = filter;

  const isDisabledFilter = (disabledType, eventsNotType) => {
    if (eventsNotType && eventsNotType.length) {
      if (disabledType === `PAST` && eventsNotType.every((item) => +new Date(item.startDate) > +new Date())) {
        return true;
      }
      if (disabledType === `FUTURE` && eventsNotType.every((item) => +new Date(item.endDate) < +new Date())) {

        return true;
      }
      return false;
    }

    return true;
  };

  return (
    `<div class="trip-filters__filter">
        <input
          id="filter-${name}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio" name="trip-filter"
          ${type === currentFilterType ? `checked` : ``}
          value="${type}"
          ${isDisabledFilter(type, events) ? `disabled` : ``} >
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
  );
};

const createTripFiltersTemplate = (filterItems, currentFilterType, events) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createTripFilterItemTemplate(filter, currentFilterType, events))
    .join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilters extends AbstractView {
  constructor(filters, currentFilterType, events) {
    super();
    this._filters = filters;
    this._events = events;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFiltersTemplate(this._filters, this._currentFilter, this._events);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
