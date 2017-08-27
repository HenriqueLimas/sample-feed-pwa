import initRouter from './router.js'
import { query } from './utils/dom'
import { loadCurrentPositionIntoCookies } from './geolocation.js'

initRouter()

loadCurrentPositionIntoCookies(window)(navigator.geolocation)
  .catch(console.error)
