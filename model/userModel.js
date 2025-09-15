const e = require("express");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true,'username is required'],
        maxlegnth :[20, "Username should not be more than 20 characters"],
        minlegnth :[3, "Username should not be less than 3 characters"],
        unique: true,
        trim : true

    },
    email: { 
        type: String, 
        required: [true,'email is required'],
        maxlegnth :[20, "email should not be more than 20 characters"],
        minlegnth :[3, "email should not be less than 3 characters"],
        unique: true,
        trim : true
    },
    password: { 
        type: String, 
        required: [true,'password is required'],
        maxlegnth :[20, "password should not be more than 20 characters"],
        //minlegnth :[6, "password should not be less than 6 characters"],
        trim : true
    },
    profilePic : {
        type: String,
    },
    address : {
        type: String,
        max :[100, "address should not be more than 100 characters"],
        min :[3, "address should not be less than 3 characters"],
        trim : true 
    },
    city : {
        type: String,
        max :[20, "city should not be more than 20 characters"],
        min :[3, "city should not be less than 3 characters"],
        trim : true
    },
    country : {
        type: String,
        max :[20, "country should not be more than 20 characters"],
        min :[3, "country should not be less than 3 characters"],
        trim : true
    },
    phone : {
        type: String,
        max :[15, "phone should not be more than 15 characters"],
        min :[10, "phone should not be less than 10 characters"],
        trim : true
    },
    role : {
        type: String,
        enum : ['user', 'admin'],
        default : 'user'
    },
    isverified : {
        type: Boolean,
        default : false
    }
}, {timestamps: true});

//create user model
module.exports = mongoose.model('User', userSchema);
    