export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

export const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export const DAY_IN_MS = 24 * 3600 * 1000;
export const HOUR_IN_MS = 3600 * 1000;
export const MINUTE_IN_MS = 60 * 1000;

export const PLACEHOLDER = {
  [EVENT_TYPES[0]]: `to`,
  [EVENT_TYPES[1]]: `to`,
  [EVENT_TYPES[2]]: `to`,
  [EVENT_TYPES[3]]: `to`,
  [EVENT_TYPES[4]]: `to`,
  [EVENT_TYPES[5]]: `to`,
  [EVENT_TYPES[6]]: `to`,
  [EVENT_TYPES[7]]: `in`,
  [EVENT_TYPES[8]]: `in`,
  [EVENT_TYPES[9]]: `in`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `EVERYTHING`,
  FUTURE: `FUTURE`,
  PAST: `PAST`,
};
/*
export const MenuItem = {
  ADD_NEW_EVENT: `ADD_NEW_EVENT`,
  TABLE: `TABLE`,
  STATIS: `STATIS`
};
*/
