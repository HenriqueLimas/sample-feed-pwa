import Article from '../../../views/components/article.js'
import { createImageLoader } from '../load-images.js';

const loadArticleImages = createImageLoader('.js-articleItem')

export default function init(global) { 
  global.WebComponents.waitFor(() => {
    class ArticleList extends global.HTMLElement {
      connectedCallback() {
        this.articles = window.__articles

        this.render({ articles: this.articles })
      }

      render(ctx) {
        this.innerHTML = ctx.articles.map(article => Article({ article })).join('')

        loadArticleImages(this)
      }
    }

    global.customElements.define('article-list', ArticleList)
  })
}