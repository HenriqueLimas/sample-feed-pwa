import { define } from 'osagai'
import { onConnected } from 'osagai/lifecycles'
import { createImageLoader } from "../load-images";

export const loadHeadlineImage = createImageLoader('.js-home-headline')

export default function init(global) {
  global.WebComponents.waitFor(() => {
    function HomeHeadline({ element }) {
      onConnected(element, () => loadHeadlineImage(element))
    }

    define('home-headline', HomeHeadline)
  })
}