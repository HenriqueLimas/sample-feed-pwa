const CloseAnchor = (ctx = {}) => `
  <a href=${ctx.link || '/'} aria-label="Close view" class="view__close-button js-view__go-back" data-view-position=${ctx.viewPosition || ''}>
    <svg fill=${ctx.color || '#FFFFFF'} height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  </a>
`

export default CloseAnchor
