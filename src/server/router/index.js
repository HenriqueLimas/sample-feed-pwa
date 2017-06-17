const express = require('express')
const router = express()

const home = require('./home')
router.get('/', home)

module.exports = router
