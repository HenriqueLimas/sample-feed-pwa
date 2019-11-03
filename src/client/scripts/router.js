import { MaybeCondition, map, chain, compose } from "./utils/fp.js";

const location = window.location;
const history = window.history;
const MaybeDifferentLocation = MaybeCondition(
  ctx => ctx.currentLocation !== ctx.location.pathname
);
const MaybeDifferentHref = MaybeCondition(
  ctx => ctx.clickedAnchor.href !== ctx.location.href
);
const MaybeClick = MaybeCondition(
  ctx =>
    !ctx.clickEvent.metaKey &&
    !ctx.clickEvent.ctrlKey &&
    ctx.clickEvent.button === 0
);
const MaybeAnchor = MaybeCondition(ctx => ctx.clickedAnchor);

const showSpinner = ctx => {
  return new Promise(resolve => {
    ctx.spinnerTimeout = setTimeout(() => {
      ctx.spinner.classList.add("spinner--loading");
    }, 250);

    resolve(ctx);
  });
};

const hideSpinner = ctx => {
  return new Promise(resolve => {
    clearTimeout(ctx.spinnerTimeout);
    requestAnimationFrame(() => {
      ctx.spinner.classList.remove("spinner--loading");
      resolve(ctx);
    });
  });
};

const getViewIdFromLocation = location =>
  location.pathname.replace("/", "") || "home";

const loadView = ctx => {
  return new Promise((resolve, reject) => {
    const path = ctx.location.pathname;
    const request = new XMLHttpRequest();
    request.responseType = "document";
    request.onload = evt => {
      if (evt.target.status >= 400) {
        reject(evt.target.statusText);
      } else {
        ctx.newView = evt.target.response;
        resolve(ctx);
      }
    };

    request.onerror = reject;
    request.open("get", path);
    request.send();
  });
};

const updateView = ctx => {
  return new Promise(resolve => {
    const viewId = getViewIdFromLocation(ctx.location);
    let viewToClose = document.querySelector(".js-viewContainer");

    const newViewContainer = ctx.newView.querySelector(".js-viewContainer");

    if (!newViewContainer) return resolve(ctx);

    const newStyles = Array.from(
      ctx.newView.querySelectorAll('link[rel="stylesheet"]')
    );
    const currentStyles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    ).map(link => link.getAttribute("href"));

    const newScripts = Array.from(ctx.newView.querySelectorAll("script"));
    const currentScripts = Array.from(document.querySelectorAll("script")).map(
      script => script.getAttribute("src")
    );

    newScripts
      .filter(script => !~currentScripts.indexOf(script.getAttribute("src")))
      .map(script => {
        const newScript = document.createElement("script");

        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.innerText = script.innerText;
        }

        return newScript;
      })
      .map(script => document.body.appendChild(script));

    Promise.all(
      newStyles
        .filter(link => !~currentStyles.indexOf(link.getAttribute("href")))
        .map(link => {
          const linkToAdd = link.cloneNode(true);
          document.head.appendChild(linkToAdd);

          return new Promise(resolve => {
            const handleLoadEvent = function() {
              resolve(handleLoadEvent);
            };

            linkToAdd.addEventListener("load", handleLoadEvent);
          }).then(function(handlerToRemove) {
            linkToAdd.removeEventListener("load", handlerToRemove);
          });
        })
    ).then(function(links) {
      showView();
    });

    function showView() {
      requestAnimationFrame(() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            newViewContainer.id = viewId;

            viewToClose.parentElement.replaceChild(
              newViewContainer,
              viewToClose
            );

            resolve(ctx);
          });
        }, 100);
      });
    }
  });
};

const hideView = ctx => {
  if (ctx.container.classList.contains("hide-area")) {
    return ctx;
  }

  ctx.container.classList.add("hide-area");
  return ctx;
};

const updateLocation = ctx => {
  ctx.currentLocation = ctx.location.pathname;
  return ctx;
};

const replaceState = ctx => {
  const state = {
    scrollY: ctx.scrollY
  };

  ctx.history.replaceState(state, null, ctx.location.href);

  return ctx;
};

const pushState = ctx => {
  ctx.history.pushState(null, null, ctx.clickedAnchor.href);
  return ctx;
};

const getAnchor = ctx => {
  let node = ctx.clickEvent.target;

  do {
    if (node === null || node.nodeName.toLowerCase() === "a") break;

    node = node.parentNode;
  } while (node);

  ctx.clickedAnchor = node;

  return ctx;
};

const preventDefault = ctx => {
  ctx.clickEvent.preventDefault();
  return ctx;
};

const onChanged = compose(
  map(updateLocation),
  chain(hideSpinner),
  chain(updateView),
  chain(loadView),
  chain(hideView),
  chain(showSpinner),
  MaybeDifferentLocation
);

const updateHistoryState = compose(
  onChanged,
  pushState,
  replaceState
);

const onClicked = compose(
  map(updateHistoryState),
  chain(MaybeDifferentHref),
  map(preventDefault),
  chain(MaybeAnchor),
  map(getAnchor),
  MaybeClick
);

const ctx = {
  location,
  history,
  currentLocation: location.pathname,
  spinner: document.body,
  container: document.body
};

export default function init() {
  document.addEventListener("click", evt => {
    ctx.clickEvent = evt;
    ctx.scrollY = window.scrollY;
    onClicked(ctx);
  });

  window.addEventListener("popstate", () => onChanged(ctx));
}
