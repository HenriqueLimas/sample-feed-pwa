import { loadCurrentPositionIntoCookies } from './geolocation.js'
import initRouter from './router.js'

initRouter();

loadCurrentPositionIntoCookies(window)(navigator.geolocation)
  .catch(console.error)
