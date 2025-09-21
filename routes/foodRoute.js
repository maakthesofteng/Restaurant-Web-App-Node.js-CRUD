const express = require('express')
const foodRouter = express.Router();

const foodController = require('../controllers/foodController');
const authMiddleware = require('../middlewares/authMiddleware');

foodRouter.post('/food/create-food-item', authMiddleware, foodController.createFoodItem);
foodRouter.get('/food/getAll', foodController.getAllFoodItem);
foodRouter.get('/food/getFoodItem/:id', foodController.getFoodById)
foodRouter.get('/food/getFoodItemFromResturant/:id', foodController.getFoodItemByResturantId)
foodRouter.put('/food/update-food-item/:id', authMiddleware, foodController.updateFoodItem)
foodRouter.delete('/food/delete-food-item/:id', authMiddleware, foodController.deleteFoodItem)


module.exports = foodRouter;