const express = require('express')
const resturantRoute = express.Router()

const resturantController = require('../controllers/resturantController');
const authMiddleware = require('../middlewares/authMiddleware');

resturantRoute.post('/resturant/create-resturant', authMiddleware, resturantController.postCreateResturant)
resturantRoute.get('/resturant/get-all-resturants', authMiddleware, resturantController.getAllResturants)
resturantRoute.get('/resturant/get-resturant/:id', authMiddleware, resturantController.getSingleResturant)
resturantRoute.delete('/resturant/delete-resturant/:id', authMiddleware, resturantController.deleteResturant)

module.exports = resturantRoute;