import Header from './partials/header.js'
import Footer from './partials/footer.js'

const Home = (ctx) => `
  ${Header({ title: 'Home' })}

  <h3>This is the Home</h3>

  ${Footer({ title: 'Home', scripts: ctx.scripts })}
`

export default Home
