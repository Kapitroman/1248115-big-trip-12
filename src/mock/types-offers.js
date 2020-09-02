import {EVENT_TYPES} from "../const.js";
import {generateId} from "../utils/common.js";

export const typesOffers = {
  [EVENT_TYPES[0]]: [{typeOffer: generateId(), title: `Add luggage`, cost: 20}, {typeOffer: generateId(), title: `order Uber`, cost: 30}, {typeOffer: generateId(), title: `Switch to comfort`, cost: 50}, {typeOffer: generateId(), title: `Add breakfast`, cost: 40}, {typeOffer: generateId(), title: `Lunch in city`, cost: 70}],
  [EVENT_TYPES[1]]: [{typeOffer: generateId(), title: `Switch to comfort`, cost: 50}, {typeOffer: generateId(), title: `Book tickets`, cost: 40}, {typeOffer: generateId(), title: `order Uber`, cost: 30}],
  [EVENT_TYPES[2]]: [{typeOffer: generateId(), title: `order Uber`, cost: 30}, {typeOffer: generateId(), title: `Switch to comfort`, cost: 50}],
  [EVENT_TYPES[3]]: [],
  [EVENT_TYPES[4]]: [{typeOffer: generateId(), title: `Book tickets`, cost: 40}, {typeOffer: generateId(), title: `Switch to comfort`, cost: 50}, {typeOffer: generateId(), title: `order Uber`, cost: 30}],
  [EVENT_TYPES[5]]: [{typeOffer: generateId(), title: `Add luggage`, cost: 20}, {typeOffer: generateId(), title: `Lunch in city`, cost: 70}, {typeOffer: generateId(), title: `order Uber`, cost: 30}, {typeOffer: generateId(), title: `Switch to comfort`, cost: 50}, {typeOffer: generateId(), title: `Add breakfast`, cost: 40}],
  [EVENT_TYPES[6]]: [],
  [EVENT_TYPES[7]]: [{typeOffer: generateId(), title: `Book tickets`, cost: 40}, {typeOffer: generateId(), title: `Switch to comfort`, cost: 50}, {typeOffer: generateId(), title: `order Uber`, cost: 30}, {typeOffer: generateId(), title: `Lunch in city`, cost: 70}, {typeOffer: generateId(), title: `Add breakfast`, cost: 40}],
  [EVENT_TYPES[8]]: [{typeOffer: generateId(), title: `order Uber`, cost: 30}, {typeOffer: generateId(), title: `Switch to comfort`, cost: 50}, {typeOffer: generateId(), title: `Add luggage`, cost: 20}, {typeOffer: generateId(), title: `Add breakfast`, cost: 40}, {typeOffer: generateId(), title: `Rent a car`, cost: 20}],
  [EVENT_TYPES[9]]: [{typeOffer: generateId(), title: `Book tickets`, cost: 40}]
};
