import Head from './partials/head.js'
import Header from './partials/header.js'
import Footer from './partials/footer.js'
import Scripts from './partials/scripts.js'

import Article from './components/article.js';
import Bookmark from './components/actions/bookmark'
import Like from './components/actions/like'
import Share from './components/actions/share'

const Home = (ctx) => {
  const headline = ctx.headline
  const isAppShell = !headline
  const articles = isAppShell ? [{}, {}, {}, {}] : ctx.articles

  return `
    ${Head({ title: 'NewsInCity', scripts: ctx.scripts, styles: ctx.styles })}

    <div class="main-site">
      ${Header(ctx)}

      <div id="home" class="homeContainer js-viewContainer js-view--open">
        <div class="js-home-headline">
          <section class="home-headline" data-image="${headline.image}">
            ${ headline ? `
              <a class="home-headline__image" href="${headline.url}" aria-label="Go to article ${headline.title}"></a>
              <div class="home-headline__details">
                <h2 class="title home-headline__title">${headline.title}</h2>
                <h3 class="subtitle home-headline__subtitle">${headline.subtitle}</h3>
                <div class="home-headline__actions actions">
                  ${Like()}
                  ${Bookmark()}
                  ${Share()}
                </div>
              </div>
              ` : ''
            }
          </section>
        </div>

        <article-list class="articleList">
          <noscript>
            ${articles.map(article => Article({ article }))}
          </noscript>
        </article-list>

        <script id="articleList">
            window.__articles = ${JSON.stringify(articles)}
        </script>
      </div>

      ${Footer(ctx)}
    </div>

    ${Scripts({ scripts: ctx.scripts })}
  `
}

export default Home
