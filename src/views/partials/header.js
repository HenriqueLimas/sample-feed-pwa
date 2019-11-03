const Header = ctx => `
  <header class="header">
    <div class="header-inner">
      ${
        ctx.previousView
          ? `<a class="back-icon" href="#" aria-label="Go to previeous view">
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </a>`
          : `<a class="menu" href="#" aria-label="Open menu">
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </a>
        `
      }
      <a class="logo" href="/">
        NewsInCity
      </a>

      ${
        ctx.user
          ? `<div class="user">
          <img src="${ctx.user.img}" alt="${ctx.user.name} picture" />
        </div>`
          : `<a href="/login" class="login" data-view-position="bottom">Login</a>`
      }
    </div>
  </header>
  <div class="header header--spacer"></div>
`;

export default Header;
