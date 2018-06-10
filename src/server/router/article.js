const Article = require('../../views').Article
const ArticleModel = require('../models/article')
const {
  addScripts,
  addStyles,
  ServerSuccess,
  ServerError,
  render
} = require('../utils')

module.exports = function articleDetails (req, res) {
  const { id } = req.params

  ArticleModel.getArticle(id)
    .map(addScripts(['app.js']))
    .map(addStyles(['article.css']))
    .chain(render(Article))
    .fork(ServerError(res), ServerSuccess(res))
}
