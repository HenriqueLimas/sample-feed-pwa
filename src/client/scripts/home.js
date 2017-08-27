import { query, updateDom } from './utils/dom'
import { loadArticleImages } from './load-images.js'
import Article from '../../views/components/article'

const articlesInjected = (window.nic && window.nic.articles) || []
const container = query('.nic-js-articles', document)

const updateArticles = (container, articles) => {
  const newContainer = document.createElement('div')
  newContainer.className = container.className

  newContainer.innerHTML = articles.map(article => Article({ article})).join('')

  return updateDom(container, newContainer)
}

updateArticles(container, articlesInjected)
loadArticleImages(container)
