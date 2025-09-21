const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

// Register Route
router.post('/client/register', authController.postClientRegisterController)
router.post('/client/login', authController.postClientLoginController)

module.exports = router;