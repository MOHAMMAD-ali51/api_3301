const express = require('express');
const router = express.Router();
//localhost:3000/api/v2/auth/signup
//signup user
router.post('/signup', (req, res) => {
     res.send ('signup user route');
});


module.exports = router;
