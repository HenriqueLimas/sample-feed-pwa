const path = require('path')
const express = require('express')
const app = express()

const PATH = path.join(__dirname, '..', 'client')

const views = require('../views')

app.use('/static', express.static(PATH))
app.get('/', function (req, res) {
  res.set('Content-Type', 'text/html')
  res.send(views.Home({ scripts: ['app.js'] }))
})

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
