export const bind = (fn, ...args) => {
  function curriedBind(o, ...args) {
    return fn.bind.apply(fn, [o].concat(args))
  }

  return args.length
    ? curriedBind.apply(this, args)
    : curriedBind
}

export const curry = fn => {
  return function (...args) {
    const g = bind(fn).apply(fn, [this].concat(args))
    return args.length < fn.length ? curry(g) : g()
  }
}

export const compose = (...args) => ctx => args.reverse().reduce((ctx, fn) => fn(ctx), ctx)

export const Functor = value => {
  return {
    map: (fn) => fn(value),
    valueOf: () => value,
    chain: () => value,
    toString: () => `Functor(${value})`
  }
}

export const Maybe = value => {
  return {
    map: (fn) => value ? Functor(fn(value)) : Maybe(null),
    valueOf: () => value,
    chain: () => value,
    of: value => Maybe(value),
    toString: () => `Maybe(${value})`
  }
}

export const MaybeCondition = curry((condition, value) => {
  return {
    map: (fn) => condition(value) ? Functor(fn(value)) : Maybe(null),
    valueOf: () => value,
    chain: () => value,
    of: value => MaybeCondition(condition, value),
    toString: () => `MaybeCondition(${value})`
  }
})

export const of = curry((obj, value) => obj.of(value))
export const map = curry((fn, obj) => {
  if (obj.map) return obj.map(fn)
  return chain(compose(of, fn), obj)
})

export const identity = v => v

export const chain = curry((fn, obj) => obj.chain ? obj.chain(fn) : obj.then(fn))
export const mjoin = obj => chain(identity, obj)

