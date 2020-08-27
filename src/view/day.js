import {getDateTime, getFormatDate} from "./../utils/event.js";
import AbstractView from "./abstract.js";

const createDayTemplate = (date, count) => {
  const viewDay = () => {
    return (
      `<span class="day__counter">${count}</span>
      <time class="day__date" datetime="${getDateTime(date)}">${getFormatDate(date)}</time>`
    );
  };

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${date && count ? viewDay() : ``}
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day extends AbstractView {
  constructor(date, count) {
    super();
    this._date = date;
    this._count = count;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._count);
  }
}
