import { createImageLoader } from "../load-images";

export const loadHeadlineImage = createImageLoader('.js-home-headline')

export default function init(global) { 
  global.WebComponents.waitFor(() => {
    class HomeHeadline extends global.HTMLElement {
      connectedCallback() {
        loadHeadlineImage(this)
      }
    }

    global.customElements.define('home-headline', HomeHeadline)
  })
}