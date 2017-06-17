const rollup = require('rollup')

let cache

const entries = [
  'views/index.js'
]

entries.forEach(entry => {
  rollup.rollup({
    entry: `src/${entry}`,
    cache
  }).then(bundle => {
    cache = bundle
    bundle.write({
      format: 'cjs',
      dest: `dist/${entry}`
    })
  })
})

