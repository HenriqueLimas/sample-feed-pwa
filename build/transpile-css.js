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
  'app.css'
]

const BASE_PATH = 'src/client/styles/'

const styles = [
  'login.css'
]

const processCss = entry => {
  return new Promise((resolve, reject) => {
    fs.readFile(BASE_PATH + entry, (err, css) => {
      if (err) return reject(err)

      processor.process(css, { in: BASE_PATH + entry, out: `dist/client/styles/${entry}` })
        .then(resolve)
        .catch(reject)
    })
  })
}

const writeFile = fileName => results => {
  const css = results.reduce((css, result) => css + result.css, '')
  const map = results.reduce((map, result) => result.map ? map + result.map : map, '')

  fs.writeFile(`dist/client/styles/${fileName}`, css)
  if (map) fs.writeFile(`dist/client/styles/${fileName}.map`, map)
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

