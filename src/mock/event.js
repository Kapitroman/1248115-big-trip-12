import {EVENT_TYPE, DESTINATION} from "../const.js";
import {getRandomInteger} from "../utils.js";

const getEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPE.length - 1);

  return EVENT_TYPE[randomIndex];
};

const generateDestination = () => {

  const randomIndex = getRandomInteger(0, DESTINATION.length - 1);

  return DESTINATION[randomIndex];
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

const generateOffers = () => {
  const countOffers = getRandomInteger(0, 5);
  const offers = [];
  const titles = [`Order Uber`, `Add luggage`, `Rent a car`, `Add breakfast`, `Book tickets`, `Lunch in city`, `Switch to comfort`];
  for (let i = 0; i < countOffers; i++) {
    offers.push({
      title: titles[getRandomInteger(0, titles.length - 1)],
      cost: getRandomInteger(5, 100)
    });
  }

  return offers;
};

export const generateEvent = () => {

  return {
    type: getEventType(),
    destination: generateDestination(),
    date: generateEventDate(),
    cost: getRandomInteger(20, 1000),
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
