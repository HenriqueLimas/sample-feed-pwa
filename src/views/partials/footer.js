import Scripts from './scripts.js'

const Footer = ctx => `
  <footer class="nic-footer">
    <a class="nic-footer-logo" href="/">
      NewInCity
    </a>
  </footer>

  ${Scripts(ctx)}
`

export default Footer
