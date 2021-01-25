const express = require('express');
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/patientDB';
const app = express();
// const cors = require('cors');

mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, ()=>{
    console.log("Success!! connected to db");
});

const patientRoute = require('./routes/patients');
const questionRoute = require('./routes/questions');
const ficheRoute = require('./routes/fiches');

// app.use(cors());
app.use('/patient', patientRoute);
app.use('/patient/test', questionRoute);
app.use('/patient/fiche', ficheRoute);

app.get('/', (req, res, next)=>{
    res.send("home");
});

//mongoose.disconnect();
app.listen(3000);
