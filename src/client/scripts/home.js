import { query } from './utils/dom'
import { loadArticleImages } from './load-images.js'

const container = query('.js-articleList', document)

loadArticleImages(container)
