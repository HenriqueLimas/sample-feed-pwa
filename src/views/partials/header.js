const Header = (ctx) => `
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

</head>

<body>
  <header class="nic-header">
    ${ ctx.previousView ?
      `<a class="nic-back-icon" href="#">
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </a>` :
      `<a class="nic-menu" href="#">
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </a>
      `
    }
    <a class="nic-logo" href="/">
      <img src="/static/images/logo.png" alt="News in the city logo">
    </a>

    ${ctx.user ?
      `<div class="nic-user">
        <img src="${ctx.user.img}" alt="${ctx.user.name} picture" />
      </div>` :
      `<a href="/login" class="nic-login">Login</a>`
    }
  </header>
`

export default Header
