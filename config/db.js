const mongoose = require('mongoose');
const colors = require('colors');

//mongodb connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error: ${error}`.bgRed.white);
        process.exit(1);
    }
};

module.exports = connectDB;