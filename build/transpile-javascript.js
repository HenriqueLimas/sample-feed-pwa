const intro = `/**
  * Built: ${new Date()}
  */
`

const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

let cache

const entries = [
  'client/scripts/app.js'
]

entries.forEach(entry => {
  rollup.rollup({
    entry: `src/${entry}`,
    cache,
    plugins: [
      babel()
    ]
  }).then(bundle => {
    cache = bundle
    bundle.write({
      intro,
      format: 'iife',
      dest: `dist/${entry}`,
      sourceMap: process.env !== 'production'
    })
  })
})

