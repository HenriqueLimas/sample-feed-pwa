const { API_URL } = require('../config')
const { getJson } = require('../utils')

const getFirstPage = () => {
  return getJson(`${API_URL}/articles/main-page`)
}

module.exports = {
  getFirstPage
}
