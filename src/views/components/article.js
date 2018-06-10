import Like from './actions/like'
import Bookmark from './actions/bookmark'
import Share from './actions/share'

const Article = (ctx) => `
  <article class="nic-card nic-article nic-js-article" data-image="${ctx.article.image}">
    <div class="nic-article__details">
      <h3 class="nic-title nic-article__title">${ctx.article.title}</h3>
      <h4 class="nic-subtitle nic-article__subtitle">${ctx.article.subtitle}</h4>
      <div class="nic-article__actions nic-actions">
        ${Like({ dark: true })}
        ${Bookmark({ dark: true })}
        ${Share({ dark: true })}
      </div>
    </div>
    <div class="nic-article__image-container">
      <a class="nic-article__image nic-js-article__image" data-nic-view-position="right" href="${ctx.article.url || ''}"></a>
    </div>
  </article>
`

export default Article
