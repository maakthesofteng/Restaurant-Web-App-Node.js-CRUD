const Food = require("../models/foodModel");

// Create food Item controller
exports.createFoodItem = async (req, res) => {
    try {
        const { foodName, description, foodPrice, ImageUrl, foodTags, foodCategory, code, isAvailable, resturantId, rating, ratingCount } = req.body;

        if(!foodName || !description || !foodPrice || !ImageUrl || !foodCategory || !resturantId){
            return res.status(400).send({
                success : false,
                message : "Please fill all the required fields"
            })
        }
        // Create new food item
        const createFoodItem = new Food({
            foodName, description, foodPrice, ImageUrl, foodTags, foodCategory, code, isAvailable, resturantId, rating, ratingCount
        })
        await createFoodItem.save();
        res.status(201).send({
            success : true,
            message : "Food Item created successfully",
            createFoodItem
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in creating food item",
            error
        })   
    }
}

// Get all Food Item Controller
exports.getAllFoodItem = async (req, res) => {
    try {
        const foodGetAll = await Food.find({})
        if(!foodGetAll){
            return res.status(400).send({
                success : false,
                message : 'No food items are listed from the resturant'
            })
        }
        res.status(200).send({
            success : true,
            message : "All Food Items Fetched Successfully",
            foodGetAll,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Fetching All food items",
            error
        })
    }
}

// Get Food Item by id Controller
exports.getFoodById = async (req, res) => {
    try {
        const foodId = req.params.id;
        const findFoodItem = await Food.findById(foodId)
        if(!findFoodItem){
            return res.status(404).send({
                success : false, 
                message : 'No Food Found with this id'
            })
        }
        res.status(201).send({
            success : true,
            message : 'Food item is Fetched Successfully',
            findFoodItem
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Fetching Food Item",
            error
        })
    }
}

// Get Food Item by resturant id Controller
exports.getFoodItemByResturantId = async (req, res) => {
    try {
        const resturantId = req.params.id;
        const findFoodItem = await Food.find({resturantId})
        if(!findFoodItem){
            return res.status(404).send({
                success : false, 
                message : 'No Food Found in the resturant with this id'
            })
        }
        res.status(201).send({
            success : true,
            message : 'Food item is Fetched Successfully',
            findFoodItem
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Fetching Food Item from Resturant",
            error
        })
    }
}


// Update food item Controller
exports.updateFoodItem = async (req, res) => {
    try {
        const foodId = req.params.id
        const foodItem = await Food.findById(foodId)
        if(!foodItem){
            return res.status(400).send({
                success : false,
                message : 'No food item is found with this id'
            })
        }
        const { foodName, description, foodPrice, ImageUrl, foodTags, foodCategory, code, isAvailable, resturantId, rating, ratingCount } = req.body;

        const updatedItem = await Food.findByIdAndUpdate(foodItem, {foodName, description, foodPrice, ImageUrl, foodTags, foodCategory, code, isAvailable, resturantId, rating, ratingCount}, {new : true})
        res.status(200).send({
            success : true,
            message : 'Food Item Updated Successfully',
            updatedItem
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Updating Food Item",
            error
        })
    }
}

// Delete Food item Controller
exports.deleteFoodItem = async (req, res) => {
    try {
        const itemId = req.params.id
        const foodItem = await Food.findById(itemId);
        if(!foodItem){
            return res.status(400).send({
                success : false,
                message : 'No food item is found with this id'
            })
        }
        const deletedItem = await Food.findByIdAndDelete(foodItem)
        res.status(200).send({
            success : true,
            message : 'Item deleted Successfully',
            deletedItem
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Deleting Food Item",
            error
        })
    }
}