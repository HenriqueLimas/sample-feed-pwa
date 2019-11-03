import { define } from 'osagai'
import { onConnected } from 'osagai/lifecycles'
import Article from '../../../views/components/article.js'
import { createImageLoader } from '../load-images.js';

const loadArticleImages = createImageLoader('.js-articleItem')

export default function init(global) {
  global.WebComponents.waitFor(() => {
    function ArticleList({ element }) {
      const articles = global.__articles
      onConnected(element, () => {
        loadArticleImages(element)
      })

      return () => articles.map(article => Article({ article })).join('')
    }

    define('article-list', ArticleList)
  })
}