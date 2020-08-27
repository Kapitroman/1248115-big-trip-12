import {DAY_IN_MS, HOUR_IN_MS, MINUTE_IN_MS} from "./../const.js";

export const getShortTime = (date) => {
  const shortTime = [
    `0${date.getHours()}`,
    `0${date.getMinutes()}`
  ].map((item) => item.slice(-2));

  return shortTime.join(`:`);
};

export const getDateTime = (date) => {
  const dateTime = [
    `0${date.getMonth() + 1}`,
    `0${date.getDate()}`
  ].map((item) => item.slice(-2));

  return `${date.getFullYear()}-${dateTime[0]}-${dateTime[1]}`;
};

export const getFullTime = (date) => {
  return `${getDateTime(date)}T${getShortTime(date)}`;
};

export const durationTime = (timeEnd, timeStart) => {
  const duration = (timeEnd - timeStart);
  if (duration < HOUR_IN_MS) {

    return `0${Math.floor(duration / MINUTE_IN_MS)}M`.slice(-3);

  } else if (duration < DAY_IN_MS) {
    const hours = Math.floor(duration / HOUR_IN_MS);
    const minutes = Math.floor((duration - hours * HOUR_IN_MS) / MINUTE_IN_MS);
    const stringHours = `0${hours}H`.slice(-3);
    const stringMinutes = `0${minutes}M`.slice(-3);

    return `${stringHours} ${stringMinutes}`;

  } else {
    const days = Math.floor(duration / (DAY_IN_MS));
    const hours = Math.floor((duration - days * DAY_IN_MS) / HOUR_IN_MS);
    const minutes = Math.floor((duration - days * DAY_IN_MS - hours * HOUR_IN_MS) / MINUTE_IN_MS);
    const stringDays = `0${days}D`.slice(-3);
    const stringHours = `0${hours}H`.slice(-3);
    const stringMinutes = `0${minutes}M`.slice(-3);

    return `${stringDays} ${stringHours} ${stringMinutes}`;
  }
};

export const getFormatDate = (date) => {
  const formatter = new Intl.DateTimeFormat(`en-US`, {
    month: `short`,
    day: `2-digit`
  });

  return formatter.format(date);
};

export const getFormatEditTime = (date) => {
  const shortDateTime = [
    `0${date.getDate()}`,
    `0${date.getMonth() + 1}`,
    `${date.getFullYear()}`,
    `0${date.getHours()}`,
    `0${date.getMinutes()}`
  ].map((item) => item.slice(-2));

  return `${shortDateTime[0]}/${shortDateTime[1]}/${shortDateTime[2]} ${shortDateTime[3]}:${shortDateTime[4]}`;
};

export const sortTime = (eventA, eventB) => {
  return (eventB.date[1] - eventB.date[0]) - (eventA.date[1] - eventA.date[0]);
};

export const sortPrice = (eventA, eventB) => {
  return eventB.cost - eventA.cost;
};
