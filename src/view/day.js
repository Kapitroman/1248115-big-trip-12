import {getDateTime, getFormatDate} from "./../utils.js";

export const createDayTemplate = (data, count) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${getDateTime(data)}2019-03-18">${getFormatDate(data)}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};
