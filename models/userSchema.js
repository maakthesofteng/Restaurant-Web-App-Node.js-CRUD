const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ 
    userName: {type : String,
        required : [true, 'Name is required']
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Password is required']
    },
    address : {
        type : Array,
    },
    phoneNumber : {
        type : String,
        required : [true, 'Phone Number is required']
    },
    userType : {
        type : String, 
        required : [true, 'User Type is required'],
        enum : ['client', 'admin', 'vendor', 'driver'],
        default : 'client'
    },
    profile : {
        type : String,
        default : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80'
    },
    answer : {
        type : String,
        required : [true, 'Answer is required']
    }
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema);