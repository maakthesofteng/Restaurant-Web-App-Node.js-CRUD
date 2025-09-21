const express = require('express')
const categoryRouter = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController')

categoryRouter.post('/category/create-category', authMiddleware, categoryController.postCreateCategory);
categoryRouter.get('/category/getAll-categories', authMiddleware, categoryController.getAllCategories);
categoryRouter.put('/category/update-category/:id', authMiddleware, categoryController.updateCategory);
categoryRouter.delete('/category/delete-category/:id', authMiddleware, categoryController.deleteCategory);


module.exports = categoryRouter;