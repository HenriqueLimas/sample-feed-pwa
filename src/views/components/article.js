import Like from './actions/like'
import Bookmark from './actions/bookmark'
import Share from './actions/share'

const Article = (ctx) => `
  <article class="card articleItem js-articleItem" data-image="${ctx.article.image}">
    <div class="articleItem__details">
      <h3 class="title articleItem__title">${ctx.article.title}</h3>
      <h4 class="subtitle articleItem__subtitle">${ctx.article.subtitle}</h4>
      <div class="articleItem__actions actions">
        ${Like({ dark: true })}
        ${Bookmark({ dark: true })}
        ${Share({ dark: true })}
      </div>
    </div>
    <div class="articleItem__image-container">
      <a class="articleItem__image js-articleItem__image" href="${ctx.article.url || ''}"></a>
    </div>
  </article>
`

export default Article
