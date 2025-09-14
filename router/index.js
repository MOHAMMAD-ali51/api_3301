const express = require('express');
const router = express.Router();
const api = require('./api');
//localhost:3000/api/v2/
router.use('/api/v2', api);
//route not found
router.use((req,res )=>{
    return res.status(404).send('success: false, message: route not found');
});

module.exports = router;