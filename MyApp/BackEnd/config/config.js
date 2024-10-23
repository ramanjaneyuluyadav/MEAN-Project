const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/Demo';

const connectDB = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;


