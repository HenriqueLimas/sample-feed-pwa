const Home = require('../../views').Home
const Article = require('../models/article')

module.exports = function home (req, res) {
  Article.getFirstPage()
    .then(firstPage => {
      res.send(Home(Object.assign({}, firstPage, {
        scripts: ['app.js']
      })))
    })
}
