export const getTotalCost = (events) => {
  let total = 0;
  for (let i = 0; i < events.length; i++) {
    total += events[i].price;
    for (let y = 0; y < events[i].offers.length; y++) {
      total += events[i].offers[y].price;
    }
  }
  return total;
};
