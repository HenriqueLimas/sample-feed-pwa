const Footer = (ctx) => `
  <footer>
    <p>This is the footer</p>
  </footer>

  ${ctx.scripts.map(path => (
    `<script async src="/static/scripts/${path}"></script>`
  )).join('\n')}

</body>
</html>
`

export default Footer
