import { MaybeCondition, map, chain, compose, curry } from './utils/fp.js'

const location = window.location
const history = window.history
const MaybeDifferentLocation = MaybeCondition(ctx => ctx.currentLocation !== ctx.location.pathname)
const MaybeDifferentHref = MaybeCondition(ctx => ctx.clickedAnchor.href !== ctx.location.href)
const MaybeClick = MaybeCondition(ctx => (!ctx.clickEvent.metaKey && !ctx.clickEvent.ctrlKey && (ctx.clickEvent.button === 0)))
const MaybeAnchor = MaybeCondition(ctx => ctx.clickedAnchor)

const showSpinner = ctx => {
  return new Promise(resolve => {
    ctx.spinnerTimeout = setTimeout(() => {
      ctx.spinner.classList.add('nic-spinner--loading')
    }, 1000)

    resolve(ctx)
  })
}

const hideSpinner = ctx => {
  return new Promise(resolve => {
    clearTimeout(ctx.spinnerTimeout)
    requestAnimationFrame(() => {
      ctx.spinner.classList.remove('nic-spinner--loading')
      resolve(ctx)
    })
  })
}

const loadView = ctx => {
  return new Promise((resolve, reject) => {
    const path = ctx.location.pathname
    const request = new XMLHttpRequest()
    request.responseType = 'document'
    request.onload = evt => {
      if (evt.target.status >= 400) {
        reject(evt.target.statusText)
      } else {
        ctx.newView = evt.target.response
        resolve(ctx)
      }
    }

    request.onerror = reject
    request.open('get', path)
    request.send()
  })
}

const updateView = ctx => {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // TODO: must improve, that is not the right solution
        document.head.innerHTML = ctx.newView.head.innerHTML
        document.body.innerHTML = ctx.newView.body.innerHTML
        resolve(ctx)
      })
    })
  })
}

const hideView = ctx => {
  if (ctx.container.classList.contains('nic-hide-area')) {
    return ctx
  }

  ctx.container.classList.add('nic-hide-area')
  return ctx
}

const updateLocation = ctx => {
  ctx.currentLocation = ctx.location.pathname
  return ctx
}

const replaceState = ctx => {
  const state = {
    scrollY: ctx.scrollY
  }

  ctx.history.replaceState(state, null, ctx.location.href)

  return ctx
}

const pushState = ctx => {
  ctx.history.pushState(null, null, ctx.clickedAnchor.href)
  return ctx
}

const getAnchor = ctx => {
  let node = ctx.clickEvent.target

  do {
    if (node === null || node.nodeName.toLowerCase() === 'a') break

    node = node.parentNode
  } while (node);

  ctx.clickedAnchor = node

  return ctx
}

const preventDefault = ctx => {
  ctx.clickEvent.preventDefault()
  return ctx
}

const onChanged = compose(
  map(updateLocation),
  chain(hideSpinner),
  chain(updateView),
  chain(loadView),
  chain(hideView),
  chain(showSpinner),
  MaybeDifferentLocation
)

const updateHistoryState = compose(
  onChanged,
  pushState,
  replaceState
)

const onClicked = compose(
  map(updateHistoryState),
  chain(MaybeDifferentHref),
  map(preventDefault),
  chain(MaybeAnchor),
  map(getAnchor),
  MaybeClick
)

const ctx = {
  location,
  history,
  currentLocation: location.pathname,
  spinner: document.body,
  container: document.body
}

export default function init() {
  document.addEventListener('click', evt => {
    ctx.clickEvent = evt
    ctx.scrollY = window.scrollY
    onClicked(ctx)
  })

  window.addEventListener('popstate', () => onChanged(ctx))
}
