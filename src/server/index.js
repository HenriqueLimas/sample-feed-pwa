const path = require('path')
const express = require('express')
const app = express()

const router = require('./router')
app.use(router)

const PATH = path.join(__dirname, '..', 'client')
app.use('/static', express.static(PATH))

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
