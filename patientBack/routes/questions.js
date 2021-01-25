const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model 
const Question = require('../models/Question');

// middleware
router.use(bodyParser.json());

router.post('/', async (req, res, next)=>{
    const qs = new Question({
        question: req.body.question
    });
    try {
        const sv = await qs.save();
        res.json(sv);
    } catch (err) {
        
    }
});

router.get('/', async (req, res, next)=>{
    try {
        const questions = await Question.find();
        res.json(questions);
        // console.log(questions);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;