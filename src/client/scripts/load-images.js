import { compose, map } from "./utils/fp.js";
import { query, queryAll, data } from "./utils/dom.js";

const getImageUrl = data("image");
const queryImageContainer = query(".js-image__container");

const changeBackgroundImage = element => {
  const imageUrl = getImageUrl(element);

  const imageContainer = queryImageContainer(element);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      imageContainer.style.backgroundImage = `url(${imageUrl})`;
    });
  });
};

export const createImageLoader = element =>
  compose(
    map(changeBackgroundImage),
    queryAll(element)
  );
