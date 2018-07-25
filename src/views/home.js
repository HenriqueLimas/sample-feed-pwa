import Head from './partials/head.js'
import Header from './partials/header.js'
import Footer from './partials/footer.js'
import Scripts from './partials/scripts.js'

import Like from './components/actions/like'
import Bookmark from './components/actions/bookmark'
import Share from './components/actions/share'

const Home = (ctx) => {
  const headline = ctx.headline
  const isAppShell = !headline
  const articles = isAppShell ? [{}, {}, {}, {}] : ctx.articles

  return `
    ${Head({ title: 'NewsInCity', scripts: ctx.scripts, styles: ctx.styles })}

    <div class="main-site">
      ${Header(ctx)}

      <div id="home" class="homeContainer js-viewContainer">
        <div class="js-home-headline">
          <section class="home-headline" data-image="${headline.image}">
            ${ headline ? `
              <a class="home-headline__image" href="${headline.url}"></a>
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

        <div class="articleList js-articlesList">
        </div>
      </div>

      <script>
        window.nic = window.nic || {}
        window.nic.articles = ${JSON.stringify(articles)}
      </script>

      ${Footer(ctx)}
    </div>

    ${Scripts({ scripts: ctx.scripts })}
  `
}

export default Home
