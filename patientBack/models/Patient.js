const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    CIN:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Patients', PatientSchema);

