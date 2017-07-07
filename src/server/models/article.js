const { API_URL } = require('../config')
const { getJson } = require('../utils')

const getFirstPage = () => {
  return getJson(`${API_URL}/artices/main-page`)
}

module.exports = {
  getFirstPage
}
