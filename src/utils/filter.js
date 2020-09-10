import {FilterType} from "../const";
import {isEventFuture, isEventPast} from "./event";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.filter((event) => event),
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.startDate)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.endDate)),
};
