import initRouter from './router.js'
import { query } from './utils/dom'
import { loadArticleImages } from './load-images.js'
import { loadCurrentPositionIntoCookies } from './geolocation.js'

initRouter()
loadArticleImages(query('.nic-js-articles', document))

loadCurrentPositionIntoCookies(window)(navigator.geolocation)
  .catch(console.error)
