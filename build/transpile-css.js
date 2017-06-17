const fs = require('fs')
const mkdirp = require('mkdirp')
const postcss = require('postcss')
const cssnext = require('postcss-cssnext')

const processor = postcss([
  cssnext({
    feature: {
      customSelectors: false,
      nesting: false,
      colorFunction: false,
      colorHwb: false,
      colorHsl: false,
      colorGray: false,
      colorHexAlpha: false,
      applyRule: false
    }
  })
])

const appShellEntries = [
  'client/styles/app.css'
]

const BASE_PATH = 'src/'

mkdirp('dist/client/styles', err => {
  if (err) return console.error(err)

  Promise.all(
    appShellEntries.map(entry => {
      return new Promise((resolve, reject) => {
        fs.readFile(BASE_PATH + entry, (err, css) => {
          if (err) return reject(err)

          processor.process(css, { in: BASE_PATH + entry, out: `dist/${entry}` })
            .then(resolve)
            .catch(reject)
        })
      })
    })
  ).then(results => {
    const css = results.reduce((css, result) => css + result.css, '')
    const map = results.reduce((map, result) => result.map ? map + result.map : map, '')

    fs.writeFile('dist/client/styles/app-shell.css', css)
    if (map) fs.writeFile('dist/client/styles/app-shell.css.map', map)
  })
})

