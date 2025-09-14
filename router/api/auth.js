const express = require('express');
const { signupController } = require('../../controllers/authContoller');
const { signinContoller } = require('../../controllers/authContoller');
const router = express.Router();
//localhost:3000/api/v2/auth/signup
//signup user
router.post('/signup',signupController);
//login user
router.post('/login', signinContoller);
//export router


module.exports = router;
