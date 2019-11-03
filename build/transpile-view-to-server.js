const rollup = require('rollup')

let cache

const entries = [
  'views/index.js'
]

entries.forEach(entry => {
  rollup.rollup({
    input: `src/${entry}`,
    cache
  }).then(bundle => {
    cache = bundle.cache
    bundle.write({
      format: 'cjs',
      file: `dist/${entry}`
    })
  })
})

