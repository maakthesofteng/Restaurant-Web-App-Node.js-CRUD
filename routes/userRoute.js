const express = require('express')
const userRoute = express.Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

userRoute.get('/user/get-user', authMiddleware ,userController.getUserController)
userRoute.put('/user/update-user', authMiddleware ,userController.updateUserController)
userRoute.post('/user/update-password', authMiddleware, userController.updatePasswordController)
userRoute.post('/user/reset-password', authMiddleware, userController.resetPasswordController)
userRoute.delete('/user/delete-user/:id', authMiddleware, userController.deleteUserController)

module.exports = userRoute