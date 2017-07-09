import Head from './head.js'

const Header = (ctx) => `
${Head(ctx)}
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
