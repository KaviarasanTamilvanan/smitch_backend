const express = require('express')
const controller = require('../controllers/user_controller')
const router = express.Router()
const validator = require('../validators/user_validator')

router.post('/signup', validator.signupValidator, controller.insert)
router.post('/login', controller.login)

module.exports = router