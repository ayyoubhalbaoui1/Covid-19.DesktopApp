const mongoose = require('mongoose');
const Patient = require('./Patient');

const ficheSchema = new mongoose.Schema({
    id_patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Patient
        // required:true
    },
    date_test:{
        type:Date,
        default:Date.now
    },
    result_test:{
        type:Boolean,
        required:true
    },
    id_medecin:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:Patient,
        required:false
    }
});

module.exports = mongoose.model('fiches', ficheSchema);

