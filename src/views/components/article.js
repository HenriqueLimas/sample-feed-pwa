import Like from './actions/like'
import Bookmark from './actions/bookmark'
import Share from './actions/share'

const Article = (ctx) => `
  <article class="card articleItem js-articleItem" data-image="${ctx.article.image}">
    <div class="articleItem__details">
      <h3 class="title articleItem__title">
        <a class="title__link" href="${ctx.article.url || ''}" aria-label="Go to article ${ctx.article.title}">
          ${ctx.article.title}
        </a>
        </a>
      </h3>
      <h4 class="subtitle articleItem__subtitle">${ctx.article.subtitle}</h4>
      <div class="articleItem__actions actions">
        ${Like({ dark: true })}
        ${Bookmark({ dark: true })}
        ${Share({ dark: true })}
      </div>
    </div>
    <div class="articleItem__image-container">
      <a class="articleItem__image js-image__container" href="${ctx.article.url || ''}" aria-label="Go to article ${ctx.article.title}"></a>
      <noscript>
        <a class="articleItem__image articleItem__image--noscript" href="${ctx.article.url || ''}" style="background-image: url(${ctx.article.image});"></a>
      </noscript>
    </div>
  </article>
`

export default Article
