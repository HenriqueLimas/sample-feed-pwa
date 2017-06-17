const rollup = require('rollup')

let cache

const entries = [
  'views/main.js'
]

entries.forEach(entry => {
  rollup.rollup({
    entry: `src/${entry}`,
    cache
  }).then(bundle => {
    cache = bundle
    bundle.write({
      intro,
      format: 'cjs',
      dest: `dist/${entry}`
    })
  })
})

