const { API_URL } = require('../config')
const { getJson } = require('../utils')

const getFirstPage = () => {
  return getJson(`${API_URL}/main-page`)
}

module.exports = {
  getFirstPage
}
