const Home = require('../../views').Home

module.exports = function home (req, res) {
  res.send(Home({
    scripts: ['app.js'],
    headline: {
      title: 'Snowing hard this week',
      subtitle: 'Montepelier will have a lot of snow today'
    }
  }))
}
