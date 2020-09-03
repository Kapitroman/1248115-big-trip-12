import {EVENT_TYPES, DESTINATIONS} from "../const.js";
import {typesOffers} from "./types-offers.js";
import {getRandomInteger, generateId} from "../utils/common.js";

const getEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
};

const generateDestination = () => {

  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);

  return DESTINATIONS[randomIndex];
};

const maxDaysGap = 7;
const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
let currentDate = +((new Date()).setSeconds(0, 0)) + daysGap * 24 * 3600 * 1000;

const generateEventDate = () => {
  const dataStart = currentDate + getRandomInteger(0, 2) * 3600 * 1000 + getRandomInteger(1, 60) * 60 * 1000;
  const dataEnd = dataStart + getRandomInteger(1, 12) * 3600 * 1000 + getRandomInteger(1, 60) * 60 * 1000;
  const eventData = [new Date(dataStart), new Date(dataEnd)];
  currentDate = dataEnd;

  return eventData;
};

const generateOffers = (type) => {

  return typesOffers[type].filter(() => Math.random() > 0.5);
};

export const generateEvent = () => {
  const eventType = getEventType();
  return {
    id: generateId(),
    type: eventType,
    destination: generateDestination(),
    date: generateEventDate(),
    cost: getRandomInteger(20, 1000),
    offers: generateOffers(eventType),
    isFavorite: Math.random() > 0.5
  };
};
