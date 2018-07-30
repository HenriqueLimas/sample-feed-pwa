const Scripts = ctx => `
  ${ctx.scripts.map(path => (
    `<script defer src="/static/scripts/${path}"></script>`
  )).join('\n')}

</body>
</html>
`

export default Scripts
