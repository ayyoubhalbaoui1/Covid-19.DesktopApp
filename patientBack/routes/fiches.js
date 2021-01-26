const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model 
const Fiche = require('../models/Fiche');

// middleware
router.use(bodyParser.json());

router.post('/', async (req, res, next)=>{
    const fiche = new Fiche({
    id_patient: req.params.id_patient,
    result_test: req.body.result_test,
    id_medecin: req.body.id_medecin
    });
    try {
        const results = await fiche.save();
        res.json(results);
    } catch (err) {
        
    }
});

router.get('/', async (req, res, next)=>{
    try {
        const fiches = await Fiche.find().populate('id_patient');
        res.json(fiches);
        console.log(fiches);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;