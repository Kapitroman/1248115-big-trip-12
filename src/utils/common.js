export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getTotalCost = (events) => {
  let total = 0;
  for (let i = 0; i < events.length; i++) {
    total += events[i].cost;
  }
  return total;
};
