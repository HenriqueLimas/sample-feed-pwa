const Home = require('../../views').Home

module.exports = function home (req, res) {
  res.send(Home({
    scripts: ['app.js']
  }))
}
