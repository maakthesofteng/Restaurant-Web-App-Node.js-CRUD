const Category = require("../models/categoryModel");

// Create Category Controller
exports.postCreateCategory = async (req, res) => {
    try {
        const { categoryName, ImageUrl } = req.body;
        if(!categoryName || !ImageUrl){
            return res.status(400).send({
                success : false,
                message : "All fields are required"
            })
        }
        // Create new category and save to database
        const createCategory = new Category({categoryName, ImageUrl})
        await createCategory.save();
        res.status(201).send({
            success : true,
            message : "Category created successfully",
            createCategory
        })     
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in createing category",
            error
        })
    }
}

// Get all categories controller
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        if(!categories){
            return res.status(404).send({
                success : false,
                message : "No Categories found",
            })
        }
        res.status(200).send({
            success : true,
            message : "All Categories fetched successfully",
            totalCategories : categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in Fetching All Categories",
            error
        })
    }
}


// Update Category Controller
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const {categoryName, ImageUrl} = req.body;
        // Update Category by ID
        const updateCategory = await Category.findByIdAndUpdate(categoryId, {categoryName, ImageUrl}, {new : true})
        if(!updateCategory){
            return res.status(404).send({
                success : false,
                message : "Category not found"
            })
        }
        res.status(200).send({
            success : true,
            message : "Category updated successfully",
            updateCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in updating category",
            error
        })
    }
}

// Delete Categpory Controller
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if(!categoryId){
            return res.status(400).send({
                success : false,
                message : "Category ID is required"
            })
        }
        // Find ID and delete Category
        const findCategoryId = await Category.findById(categoryId)
        if(!findCategoryId){
            return res.status(404).send({
                success : false,
                message : "Category not found"
            })
        }
        await Category.findByIdAndDelete(categoryId)
        res.status(200).send({
            success : true,
            message : "Category deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in deleting category",
            error
        })
    }
}