export const EVENT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

export const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export const TimeInMs = {
  DAY_IN_MS: 24 * 3600 * 1000,
  HOUR_IN_MS: 3600 * 1000
};

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
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `EVERYTHING`,
  FUTURE: `FUTURE`,
  PAST: `PAST`,
};
