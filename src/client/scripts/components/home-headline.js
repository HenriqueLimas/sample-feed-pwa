import { loadHeadlineImage } from "../load-images";

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