import Scripts from './scripts.js'

const Footer = ctx => `
  <footer class="nic-footer">
    <a class="nic-logo" href="/">
      <img src="/static/images/logo-white.png" alt="News in the city logo">
    </a>
  </footer>

  ${Scripts(ctx)}
`

export default Footer
