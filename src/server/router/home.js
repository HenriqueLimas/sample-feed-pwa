const Home = require('../../views').Home
const Article = require('../models/article')
const {
  addScripts,
  addStyles,
  ServerSuccess,
  ServerError,
  render
} = require('../utils')

module.exports = function home (req, res) {
  const { l:location } = req.cookies

  Article.getFirstPage({ location })
    .map(addScripts(['app.js', 'home.js']))
    .map(addStyles(['home.css']))
    .chain(render(Home))
    .fork(ServerError(res), ServerSuccess(res))
}
