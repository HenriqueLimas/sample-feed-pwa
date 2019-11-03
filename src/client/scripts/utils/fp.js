const functionLength = f => f._length || f.length;

export const bind = function bind(fn) {
  function curriedBind(o) {
    const args = [].slice.call(arguments, 1);
    const g = fn.bind.apply(fn, [o].concat(args));

    g._length = Math.max(functionLength(fn) - args.length, 0);

    return g;
  }

  return arguments.length > 1
    ? curriedBind.apply(this, [].slice.call(arguments, 1))
    : curriedBind;
};

export const curry = fn => {
  const a = function() {
    const g = bind(fn).apply(fn, [this].concat([].slice.call(arguments)));
    return !functionLength(g) ? g() : curry(g);
  };

  a._length = functionLength(fn);

  return a;
};

const _groupsOf = curry((n, xs) => {
  if (!xs.length) return [];
  return [xs.slice(0, n)].concat(_groupsOf(n, xs.slice(n, xs.length)));
});

const _compose = curry((f, g, x) => f(g(x)));
const toAssociativeCommaInfix = fn => {
  return function() {
    const fns = [].slice.call(arguments);
    return function() {
      return _groupsOf(2, fns)
        .reverse()
        .map(g => {
          return g.length > 1 ? fn.apply(this, g) : g[0];
        })
        .reduce((x, f) => [f.apply(f, x)], arguments)[0];
    };
  };
};

export const compose = toAssociativeCommaInfix(_compose);

export const Functor = value => {
  return {
    map: fn => Functor(fn(value)),
    valueOf: () => value,
    chain: fn => Functor(fn(value)),
    toString: () => `Functor(${value})`
  };
};

export const Maybe = value => {
  return {
    map: fn => (value ? Maybe(fn(value)) : Maybe(null)),
    valueOf: () => value,
    chain: fn => (value ? fn(value) : Maybe(null)),
    of: value => Maybe(value),
    toString: () => `Maybe(${value})`
  };
};

export const MaybeCondition = curry(function(condition, value) {
  return {
    map: fn => (condition(value) ? Maybe(fn(value)) : Maybe(null)),
    valueOf: () => value,
    chain: fn => (condition(value) ? fn(value) : Maybe(null)),
    of: value => MaybeCondition(condition, value),
    toString: () => `MaybeCondition(${value})`
  };
});

export const of = curry((obj, value) => obj.of(value));
export const map = curry((fn, obj) => {
  if (obj.map) return obj.map(fn);
  return chain(
    compose(
      of,
      fn
    ),
    obj
  );
});

export const identity = v => v;

export const chain = curry((fn, obj) => {
  return obj.chain ? obj.chain(fn) : obj.then(fn);
});

export const mjoin = obj => chain(identity, obj);
