const express = require('express')
const cookieParser = require('cookie-parser')

const router = express()
router.use(cookieParser())

const home = require('./home')
const login = require('./login')

router.get('/', home)
router.get('/login', login)

module.exports = router
