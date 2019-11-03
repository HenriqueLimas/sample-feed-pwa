export default function init(global) {
  global.WebComponents = global.WebComponents || {};

  const whenLoadedFns = [es5adapter];
  let isCustomElementsLoaded = !!global.customElements;

  global.WebComponents.waitFor = function waitFor(fn) {
    if (!fn) {
      return;
    }

    whenLoadedFns.push(fn);

    if (isCustomElementsLoaded) {
      runWhenLoadedFns();
    }
  };

  if (!isCustomElementsLoaded) {
    const SCRIPT_URL = "/static/scripts/third-parties/custom-elements.js";
    const newScript = global.document.createElement("script");
    newScript.src = SCRIPT_URL;
    newScript.async = true;
    newScript.onload = runWhenLoadedFns;
    newScript.onerror = () =>
      console.error("FailedLoading: Custom elements polyfill!");
    global.document.currentScript.parentNode.insertBefore(
      newScript,
      global.document.currentScript
    );
  } else {
    runWhenLoadedFns();
  }

  function runWhenLoadedFns(event) {
    isCustomElementsLoaded = true;

    while (whenLoadedFns.length) {
      const currentFn = whenLoadedFns.shift();
      currentFn(global);
    }
  }

  function es5adapter() {
    if (
      // No Reflect, no classes, no need for shim because native custom elements
      // require ES2015 classes or Reflect.
      global.Reflect === undefined ||
      global.customElements === undefined
    ) {
      return;
    } else {
      const BuiltInHTMLElement = global.HTMLElement;
      global.HTMLElement = function() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
      };
      global.HTMLElement.prototype = BuiltInHTMLElement.prototype;
      global.HTMLElement.prototype.constructor = global.HTMLElement;
      Object.setPrototypeOf(global.HTMLElement, BuiltInHTMLElement);
    }
  }
}
