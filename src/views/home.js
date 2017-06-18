import Header from './partials/header.js'
import Footer from './partials/footer.js'

import Like from './components/actions/like'
import Bookmark from './components/actions/bookmark'
import Share from './components/actions/share'

const Home = (ctx) => `
  ${Header({ title: 'NewsInCity' })}

  <section class="nic-main-headline">
    <a class="nic-main-headline__image" href="${ctx.headline.url}"></a>
    <div class="nic-main-headline__details">
      <h2 class="nic-main-headline__title">${ctx.headline.title}</h2>
      <h3 class="nic-main-headline__subtitle">${ctx.headline.subtitle}</h3>
      <div class="nic-main-headline__actions nic-actions">
        ${Like()}
        ${Bookmark()}
        ${Share()}
      </div>
    </div>
  </section>

  ${Footer({ title: 'Home', scripts: ctx.scripts })}
`

export default Home
