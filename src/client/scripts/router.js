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
    }, 250)

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

const getViewIdFromLocation = location => location.pathname.split('/')[1] || 'home'

const loadView = ctx => {
  return new Promise((resolve, reject) => {
    const viewId = getViewIdFromLocation(ctx.location)
    const viewExists = viewId && document.getElementById(viewId)

    if (viewExists) {
      ctx.newView = viewExists.parentNode
      return resolve(ctx)
    }

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
    const viewPosition = ctx.clickedAnchor.getAttribute('data-nic-view-position')
    const viewId = getViewIdFromLocation(ctx.location)
    let viewToClose = document.querySelector('.nic-view--open')

    if (viewToClose && viewToClose.id !== viewId) {
      if (viewToClose) {
        requestAnimationFrame(() => {
          viewToClose.classList.remove('nic-view--open')
          viewToClose.classList.add(`nic-view--${viewPosition}`)
          viewToClose.addEventListener('transitionend', hideElement)
        })

        function hideElement () {
          requestAnimationFrame(() => {
            viewToClose.classList.add(`nic-view--hide`)
            viewToClose = null
          })

          viewToClose.removeEventListener('transitionend', hideElement)
        }
      }
    }

    const viewExists = document.getElementById(viewId)
    const newView = ctx.newView.querySelector('.nic-view')
    let isLoadingStyles = false
    let view

    if (!newView || viewId === 'home') return resolve(ctx)

    if (!viewExists) {
      const newStyles = Array.from(ctx.newView.querySelectorAll('link[rel="stylesheet"]'))
      const currentStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.getAttribute('href'))

      const stylesToAdd = newStyles
        .filter(link => currentStyles.indexOf(link.getAttribute('href')) === -1)
        .map(link => {
          isLoadingStyles = true
          const linkToAdd = link.cloneNode(true)
          document.head.appendChild(linkToAdd)

          linkToAdd.addEventListener('load', loadView)

          function loadView () {
            isLoadingStyles = false
            showView()

            linkToAdd.removeEventListener('load', loadView)
          }
        })

      view = document.createElement('div')
      view.id = viewId
      view.classList.add(`nic-view--${viewPosition}`)
      const newViewClass = newView.className.split(' ')

      newViewClass
        .map(className => view.classList.add(className))

      view.innerHTML = newView.innerHTML
      document.body.appendChild(view)
    }

    view = view || viewExists

    function showView () {
      requestAnimationFrame(() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            view.classList.add('nic-view--open')
            view.classList.remove('nic-view--hide')
            view.classList.remove(`nic-view--${viewPosition}`)
            resolve(ctx)
          })
        }, 100)
      })
    }

    if (!isLoadingStyles) {
      showView()
    }

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
