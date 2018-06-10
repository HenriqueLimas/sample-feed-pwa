const fs = require('fs')
const mkdirp = require('mkdirp')
const postcss = require('postcss')
const cssnext = require('postcss-cssnext')
const atImport = require('postcss-import')

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
  }),
  atImport()
])

const appShellEntries = [
  'app.css',
]

const BASE_PATH = 'src/client/styles/'

const styles = [
  'login.css',
  'article.css',
]

const processCss = entry => {
  return new Promise((resolve, reject) => {
    fs.readFile(BASE_PATH + entry, (err, css) => {
      if (err) return reject(err)

      processor.process(css, { from: BASE_PATH + entry, to: `dist/client/styles/${entry}` })
        .then(resolve)
        .catch(reject)
    })
  })
}

const writeFile = fileName => results => {
  const css = results.reduce((css, result) => css + result.css, '')
  const map = results.reduce((map, result) => result.map ? map + result.map : map, '')
  const logError = error => error && console.error(error)

  fs.writeFile(`dist/client/styles/${fileName}`, css, logError)
  if (map) fs.writeFile(`dist/client/styles/${fileName}.map`, map, logError)
}

mkdirp('dist/client/styles', err => {
  if (err) return console.error(err)

  Promise.all(
    appShellEntries.map(processCss)
  ).then(writeFile('app-shell.css'))

  styles
    .map(entry => {
      return processCss(entry)
        .then(result => writeFile(entry)([result]))
    })
})

