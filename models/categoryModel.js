const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        required : [true, "Category Name is required"]
    },
    ImageUrl : String
}, {timestamps : true})

module.exports = mongoose.model('Category', categorySchema)