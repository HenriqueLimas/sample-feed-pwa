import { loadCurrentPositionIntoCookies } from './geolocation.js'

loadCurrentPositionIntoCookies(window)(navigator.geolocation)
  .catch(console.error)
