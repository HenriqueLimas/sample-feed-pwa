const Head = ctx => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="author" content="Henrique Limas">
  <meta name="viewport" content="width=device-width,minimum-scale=1.0">

  <title>${ctx.title}</title>

  <link rel="preload" href="/static/images/logo.png" as="image">
  <link rel="preload" href="/static/images/logo-white.png" as="image">
  ${
    ctx.scripts.map(path => `
      <link rel="preload" href="/static/scripts/${path}" as="script">
    `).join('\n')
  }

  <link rel="stylesheet" href="/static/styles/app-shell.css">

  ${ ctx.styles ? ctx.styles.map(path => `
    <link rel="stylesheet" href="/static/styles/${path}">
  `).join('\n') : '' }

</head>

<body>
`

export default Head
