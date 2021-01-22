const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model
const Patient = require('../models/Patient');

// middleware
router.use(bodyParser.json());


router.get('/', async (req, res, next)=>{
    //res.send("patient");
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.json({message:err});
    }
    next;
});

router.post('/', async (req, res, next)=>{
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
    } catch (err) {
        res.json({message:err});
    } 
    next;   
    //console.log(req.body);
});

// find patient by id 
router.get('/:id', async (req, res, next)=>{
    try {
        const patient = await Patient.findById(req.params.id);
        res.json(patient);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;