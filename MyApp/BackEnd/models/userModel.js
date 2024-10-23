const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String
});

module.exports = mongoose.model('Users', userModel)