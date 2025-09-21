const express = require('express')
const router = express.Router()

// Controller import
const testController = require('../controllers/testController')

router.get('/test', testController.getTestController)

module.exports = router;