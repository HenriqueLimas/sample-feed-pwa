import { compose, map } from './utils/fp.js'

const loadCurrentPosition = geolocation => {
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(resolve, reject)
  })
}

const storePositionIntoCookie = ctx => position => {
  const { document, encodeURIComponent } = ctx
  const coords = position.coords
  const positionCookie = encodeURIComponent(`${coords.latitude}:${coords.longitude}`)

  document.cookie = `l=${positionCookie}`
}

export const loadCurrentPositionIntoCookies = ctx => compose(map(storePositionIntoCookie(ctx)), loadCurrentPosition)
