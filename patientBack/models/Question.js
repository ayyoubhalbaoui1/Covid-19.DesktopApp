const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question:{
        type:String    
    },
},{collection: 'questions'});

module.exports = mongoose.model('questions', questionSchema);

