const intro = `/**
  * Built: ${new Date()}
  */
`

const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const cpFile = require('cp-file')

let cache

const entries = [
  'client/scripts/app.js',
  'client/scripts/home.js'
]

const thirdParties = [
  'client/scripts/third-parties/custom-elements.js',
]

entries.forEach(entry => {
  rollup.rollup({
    input: `src/${entry}`,
    cache,
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      babel()
    ]
  }).then(bundle => {
    cache = bundle.cache
    bundle.write({
      intro,
      format: 'iife',
      file: `dist/${entry}`,
      sourcemap: process.env.NODE_ENV !== 'production'
    })
  })
})

thirdParties.forEach(entry => {
  cpFile(`src/${entry}`, `dist/${entry}`)
})