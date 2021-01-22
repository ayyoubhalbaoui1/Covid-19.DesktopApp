const mongoose = require('mongoose');

const questionSchema =  mongoose.Schema({
    question:String
});

module.exports = mongoose.model('questions', questionSchema);

