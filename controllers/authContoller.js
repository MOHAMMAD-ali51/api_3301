const emailValidation = require("../helpers/emailvalidation");
const randomOtp = require("../helpers/random-otp");
const sendEmail = require("../helpers/sendEmail");
const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const signupController =async (req, res) => {
    let { username, email, password } = req.body;
    try {
        bcrypt.hash(password, 10,async function(err, hash) {
            if(err){
                return res.status(500).json({
                    success: false, message: 'Error in hashing password', error: err.message
                });
            }else{    
               if(!emailValidation(email)){
                return res.status(400).json({
                    success: false, message: 'email is not valid'
                });
            }
            // Check if user already exists
            let existingUser = await userModel.findOne({ email });
           let user = new userModel({
                username,
                email,
                password : hash,
            });
            await user.save();
            sendEmail(email);
            return res.status(201).json({
                success: true,
                 message: 'User registered successfully',
                 user
            });}
            // Store hash in your password DB.
        
        });

    } catch (error) {
        return res.status(500).json({
            success: false, message: 'Error in signup', error: error.message
        });
    }
}; // Closing brace added for signupController

const signinContoller = (req, res) => {
    randomOtp();
    res.send('login user route');
}
module.exports = { signupController, signinContoller };