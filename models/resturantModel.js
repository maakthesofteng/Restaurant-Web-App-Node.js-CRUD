const mongoose = require('mongoose')

const resturantSchema = mongoose.Schema({
    resturantName : {
        type : String, 
        required : [true, "Resturant Name is required"]
    },
    imageUrl : String,
    foodsOption : Array,
    resturantTime : String,
    pickup : {
        type : Boolean,
        default : true
    },
    delivery : {
        type : Boolean,
        default : true
    },
    isOpen : {
        type : Boolean,
        default : true
    },
    logoUrl : String,
    rating : {
        type : Number,
        default : 1,
        min : 1,
        max : 5
    },
    ratingCount : String,
    code : String,
    coords : {
        id : {type : String},
        latitude : {type : Number},
        latitudeDelta : {type : Number},
        longitude : {type : Number},
        longitudeDelta : {type : Number},
        address : {type : String},
        title : {type : String},
    }
}, {timestamps : true})

module.exports = mongoose.model('Resturant', resturantSchema)