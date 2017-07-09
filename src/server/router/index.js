const express = require('express')
const router = express()

const home = require('./home')
const login = require('./login')

router.get('/', home)
router.get('/login', login)

module.exports = router
