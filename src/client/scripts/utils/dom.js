import { curry, compose } from './fp.js'

const elementsToArray = elements => Array.from(elements)

export const query = curry((query, parent) => {
  return parent.querySelector(query)
})

export const queryAll = curry((query, parent) => {
  return elementsToArray(parent.querySelectorAll(query))
})

export const data = curry((dataName, element) => {
  return element.getAttribute(`data-${dataName}`)
})
