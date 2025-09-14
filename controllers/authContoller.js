const userModel = require("../model/userModel");

const signupController =async (req, res) => {
    let { username, email, password } = req.body;

    try {
        let user = new userModel({
            username,
            email,
            password
        });
        await user.save();
        return res.status(201).json({
            success: true,
             message: 'User registered successfully',
             user
        });

    } catch (error) {
        return res.status(500).json({
            success: false, message: 'Error in signup', error: error.message
        });
    }
}; // Closing brace added for signupController

const signinContoller = (req, res) => {
    res.send('login user route');
}
module.exports = { signupController, signinContoller };