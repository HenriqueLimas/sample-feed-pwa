const { Login } = require('../../views')
const {
  ServerSuccess,
  ServerError,
  render
} = require('../utils')

module.exports = function login (req, res) {
  const renderLogin = render(Login)
  const ctx = {
    title: 'Login to NewsInCity',
    scripts: [],
    styles: ['login.css']
  }

  renderLogin(ctx)
    .fork(ServerError(res), ServerSuccess(res))
}
