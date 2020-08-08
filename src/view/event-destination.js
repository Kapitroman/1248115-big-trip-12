import {getDescription, getPhotos} from "../mock/destination.js";

export const createEventDestinationTemplate = () => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${getDescription()}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotos()}
        </div>
      </div>
    </section>`
  );
};
