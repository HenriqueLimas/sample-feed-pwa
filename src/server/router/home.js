const Home = require('../../views').Home
const Article = require('../models/article')
const {
  addScripts,
  ServerSuccess,
  ServerError,
  render
} = require('../utils')

module.exports = function home (req, res) {
  Article.getFirstPage()
    .map(addScripts(['app.js']))
    .chain(render(Home))
    .fork(ServerError(res), ServerSuccess(res))
}
