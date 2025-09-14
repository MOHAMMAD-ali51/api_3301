//Datebase connection file

const { default: mongoose } = require("mongoose");

async function connectDB(){
    const DB_URL = process.env.MONGO_DB_URL;
    mongoose.connect(DB_URL).then(() => { console.log("DB connected"); }).catch((err) => { console.log(err); });

    
}
//export datebase connection function
module.exports = connectDB;