import Header from './partials/header.js'
import Footer from './partials/footer.js'

import Article from './components/article'
import Like from './components/actions/like'
import Bookmark from './components/actions/bookmark'
import Share from './components/actions/share'

const Home = (ctx) => {
  const headline = ctx.headline
  const isAppShell = !headline
  const articles = isAppShell ? [{}, {}, {}, {}] : ctx.articles

  return `
    ${Header({ title: 'NewsInCity' })}

    <section class="nic-main-headline">
      ${ headline ? `
        <a class="nic-main-headline__image" href="${headline.url}"></a>
        <div class="nic-main-headline__details">
          <h2 class="nic-main-headline__title">${headline.title}</h2>
          <h3 class="nic-main-headline__subtitle">${headline.subtitle}</h3>
          <div class="nic-main-headline__actions nic-actions">
            ${Like()}
            ${Bookmark()}
            ${Share()}
          </div>
        </div>
        ` : ''
      }
    </section>

    <div class="nic-articles">
      ${articles.map(article => Article({ article })).join('')}
    </div>

    ${Footer({ title: 'Home', scripts: ctx.scripts })}
  `
}

export default Home
