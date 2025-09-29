const emailValidation = require("../helpers/emailvalidation");
const randomOtp = require("../helpers/random-otp");
const sendEmail = require("../helpers/sendEmail");
const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
//signup controller
const signupController = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        const otp = randomOtp();
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    success: false, message: 'Error in hashing password', error: err.message
                });
            } else {
                if (!emailValidation(email)) {
                    return res.status(400).json({
                        success: false, message: 'email is not valid'
                    });
                }
                // Check if user already exists
                let existingUser = await userModel.findOne({ email });
                let user = new userModel({
                    username,
                    email,
                    password: hash,
                    otp
                });
                await user.save();
                sendEmail(email, otp);
                // setTimeout(async() => {
                //     await userModel.findOneAndUpdate({email},{otp:null}).then(()=>{
                //         console.log(email,"otp deleted successfully");
                //     })
                // user.save();
                // },60000)
                return res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    user
                });
            }
            // Store hash in your password DB.

        });

    } catch (error) {
        return res.status(500).json({
            success: false, message: 'Error in signup', error: error.message
        });
    }
}; // Closing brace added for signupController

//otp controller

const otpcontroller = async (req, res) => {

    const { email, otp } = req.body;
    try {
        const otpverify = await userModel.findOne({ email });
        if (otpverify.otp === otp) {
            otpverify.isverified = true;
            otpverify.otp = null;

            await otpverify.save();
            return res.status(200).json({
                success: true,
                message: 'Your Email is now verified',

            });

        } else {
            return res.status(400).json({
                success: false, message: 'Invalid OTP'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false, error: error.message || 'something went wrong'
        });
    }

}
//signin controller

const signinContoller = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false, message: 'Invalid email '
            });
        } else {
            bcrypt.compare(password, existingUser.password, function (err, result) {
                if (!err) {

                    if (result) {
                        const userData = {
                            id: existingUser._id,
                            email: existingUser.email,
                            role: existingUser.role,
                            isverified: existingUser.isverified
                        }
                        return res.send({ message: 'login successful', data: userData });
                    } else {
                        return res.status(400).json({
                            success: false, message: 'Invalid password'
                        });
                    }
                } else {
                    return res.status(500).json({
                        success: false, message: err
                    });
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false, error: error.message || 'something went wrong'
        });
    }
};
module.exports = { signupController, signinContoller, otpcontroller };