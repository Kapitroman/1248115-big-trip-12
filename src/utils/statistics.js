const makeItemsUniq = (items) => [...new Set(items)];

export const uniqTypesTrip = (events) => {
  return makeItemsUniq(events.map((item) => item.type));
};

export const sortTrip = (TripA, TripB) => {
  return TripB[1] - TripA[1];
};
