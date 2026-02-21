const intro = `/**
  * Built: ${new Date()}
  */
`

const rollup = require('rollup')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const fs = require('node:fs')
const path = require('node:path')

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
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled'
      })
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
  const source = `src/${entry}`
  const destination = `dist/${entry}`
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.copyFileSync(source, destination)
})