const express = require('express');
const router = express.Router();
//localhost:3000/api/v2/auth/
const auth = require("./auth");


router.use('/auth', auth);

module.exports = router;