const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model
const Patient = require('../models/Patient');
const questionRoute = require('./questions');

// middleware
router.use(bodyParser.json());
router.use('/test', questionRoute)

// find all patients 
router.get('/', async (req, res, next)=>{
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.json({message:err});
    }
});

// find patient by Object id 
router.get('/:id', async (req, res, next)=>{
    let id = req.params._id;
    if (id==='test' || id==='fiche') {
        return next();
    }
    try {
        const patient = await Patient.findById(id);
        res.json(patient);
    } catch (err) {
        res.json({message:err});
    }
});

// Create new patients 
router.post('/create', async (req, res, next)=>{
    const patient = new Patient({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    CIN: req.body.CIN,
    email: req.body.email,
    phone: req.body.phone,
    create_at: req.body.create_at
    });
    try {
        const savePatient = await patient.save();
        res.json(savePatient);
        
        console.log(savePatient._id);
    } catch (err) {
        res.json({message:err});
    } 
});

// Remove patient
router.delete('/remove/:id', async (req, res, next)=>{
    try {
        const patient = await Patient.remove({_id:req.params.id});
        res.json(patient);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;