import initWebcomponents from './webcomponents.js'
import { loadCurrentPositionIntoCookies } from './geolocation.js'
import initRouter from './router.js'

initWebcomponents(window)
initRouter()

loadCurrentPositionIntoCookies(window)(navigator.geolocation)
  .catch(console.error)
