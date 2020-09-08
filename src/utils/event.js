import {DAY_IN_MS, HOUR_IN_MS} from "./../const.js";
import moment from "moment";

export const getShortTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const getDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const getFullTime = (date) => {
  return moment(date).format(`YYYY-MM-DD[T]HH:mm`);
};

export const durationTime = (timeEnd, timeStart) => {
  const duration = (timeEnd - timeStart);
  const minutes = moment.duration(duration).minutes();
  const minutesString = minutes < 10 ? `0${minutes}M` : `${minutes}M`;
  const hours = moment.duration(duration).hours();
  const hoursString = hours < 10 ? `0${hours}H` : `${hours}H`;
  const days = moment.duration(duration).days();
  const daysString = days < 10 ? `0${days}D` : `${days}D`;
  if (duration < HOUR_IN_MS) {
    return minutesString;
  } else if (duration < DAY_IN_MS) {
    return `${hoursString} ${minutesString}`;
  } else {
    return `${daysString} ${hoursString} ${minutesString}`;
  }
};

export const getFormatDate = (date) => {
  return moment(date).format(`MMM D`);
};

export const sortTime = (eventA, eventB) => {
  return (eventB.endDate - eventB.startDate) - (eventA.endDate - eventA.startDate);
};

export const sortPrice = (eventA, eventB) => {
  return eventB.cost - eventA.cost;
};

export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};

export const isEventFuture = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  return moment(new Date).isBefore(dueDate);
}

export const isEventPast = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  return moment(new Date).isAfter(dueDate);
}
