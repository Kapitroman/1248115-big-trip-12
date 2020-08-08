import {getRandomInteger} from "../utils.js";

export const getDescription = () => {

  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const randomCount = getRandomInteger(1, 5);
  const listDescription = [];

  for (let i = 0; i < randomCount; i++) {
    listDescription.push(description[getRandomInteger(0, description.length - 1)]);
  }

  return listDescription.join(` `);
};

export const getPhotos = () => {
  const randomCount = getRandomInteger(1, 5);
  const listPhotos = [];
  for (let i = 0; i < randomCount; i++) {
    listPhotos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`);
  }

  return listPhotos.join(` `);
};
