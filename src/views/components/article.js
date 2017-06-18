const Article = (ctx) => `
  <article class="nic-card nic-article">
    <div class="nic-article__details">
    </div>
    <div class="nic-article__image-container">
      <a class="nic-article__image" href="${ctx.article.url || ''}"></a>
    </div>
  </article>
`

export default Article
