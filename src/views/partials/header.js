const Header = (ctx) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="author" content="Henrique Limas">
  <meta name="viewport" content="width=device-width,minimum-scale=1.0">

  <title>${ctx.title}</title>

  <link rel="stylesheet" href="static/styles/app-shell.css">
</head>

<body>
  <header>
    <h1>Hello World</h1>
  </header>
`

export default Header
