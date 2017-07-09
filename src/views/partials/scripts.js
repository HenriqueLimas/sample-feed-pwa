const Scripts = ctx => `
  ${ctx.scripts.map(path => (
    `<script async src="/static/scripts/${path}"></script>`
  )).join('\n')}

</body>
</html>
`

export default Scripts
