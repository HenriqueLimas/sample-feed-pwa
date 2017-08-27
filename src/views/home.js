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
    ${Header({ title: 'NewsInCity', scripts: ctx.scripts })}

    <section id="home" class="nic-main-headline nic-js-main-headline" data-image="${headline.image}">
      ${ headline ? `
        <a class="nic-main-headline__image" href="${headline.url}"></a>
        <div class="nic-main-headline__details">
          <h2 class="nic-title nic-main-headline__title">${headline.title}</h2>
          <h3 class="nic-subtitle nic-main-headline__subtitle">${headline.subtitle}</h3>
          <div class="nic-main-headline__actions nic-actions">
            ${Like()}
            ${Bookmark()}
            ${Share()}
          </div>
        </div>
        ` : ''
      }
    </section>

    <div class="nic-articles nic-js-articles">
    </div>

    <script>
      window.nic = window.nic || {}
      window.nic.articles = ${JSON.stringify(articles)}
    </script>

    ${Footer({ title: 'Home', scripts: ctx.scripts })}
  `
}

export default Home
