const { API_URL } = require('../config')
const { getJson } = require('../utils')

const getFirstPage = () => {
  return getJson(`${API_URL}/articles/main-page`)
}

const getArticle = id => {
  return getJson(`${API_URL}/articles/${id}`)
}

module.exports = {
  getFirstPage,
  getArticle
}
