const Footer = (ctx) => `
  <footer class="nic-footer">
    <a class="nic-logo" href="/">
      <img src="static/images/logo-white.png" alt="News in the city logo">
    </a>
  </footer>

  ${ctx.scripts.map(path => (
    `<script async src="/static/scripts/${path}"></script>`
  )).join('\n')}

</body>
</html>
`

export default Footer
