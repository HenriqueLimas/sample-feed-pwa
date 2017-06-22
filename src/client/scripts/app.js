import initRouter from './router.js'
import { query } from './utils/dom'
import { loadArticleImages } from './load-images.js'

initRouter()
loadArticleImages(query('.nic-js-articles', document))
