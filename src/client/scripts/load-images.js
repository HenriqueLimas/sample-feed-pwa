import { compose, map } from './utils/fp.js'
import { query, queryAll, data } from './utils/dom.js'

const getImageUrl = data('image')
const queryImageContainer = query('.js-articleItem__image')
const changeBackgroundImage = element => {
  const imageUrl = getImageUrl(element)

  const imageContainer = queryImageContainer(element)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      imageContainer.style.backgroundImage = `url(${imageUrl})`
    })
  })
}

export const loadArticleImages = compose(map(changeBackgroundImage), queryAll('.js-articleItem'))
