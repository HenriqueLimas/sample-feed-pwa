import Header from './partials/header.js'
import Footer from './partials/footer.js'

import Article from './components/article'
import CloseAnchor from './components/close-anchor'

const ArticleDetails = (ctx) => {
  ctx = Object.assign({}, ctx, {
    title: ctx.article.title + ' - NewsInCity'
  })

  return `
    ${Header(ctx)}

    <div class="nic-view nic-article-view" data-nic-view-position="right">
      <div class="nic-view__content">
        <h1>${ctx.article.title}</h1>
        <h3>${ctx.article.subtitle}</h3>

        <p>${ctx.article.content}</p>
      </div>
    </div>

    ${Footer(ctx)}
  `
}

export default ArticleDetails
