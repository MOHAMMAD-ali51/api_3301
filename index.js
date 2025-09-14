const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const router = require('./router');
const connectDB = require('./config/db');
//localhost:3000/
app.use(express.json());
app.use(router);
//database connection
connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});