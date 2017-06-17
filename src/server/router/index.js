const express = require('express')
const router = express()

router.use(function (req, res, next) {
  res.set('Content-Type', 'text/html')
  next()
})

const home = require('./home')
router.get('/', home)

module.exports = router
