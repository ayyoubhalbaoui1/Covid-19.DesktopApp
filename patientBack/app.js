const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const DB_URI = 'mongodb://localhost:27017/patientDB';
const app = express();

const patientRoute = require('./routes/patients');

app.use('/patient', patientRoute);


app.get('/', (req, res, next)=>{
    res.send("home");
});



mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Success!! connected to db");
    
});
//mongoose.disconnect();
app.listen(3000);


// mongoose.connect(DB_URL,(err,patientDb)=>{
//     console.log("Success!! connected to db");
//     mongoose.disconnect();
// });

// Middlewares
// app.set('view engine', 'ejs');
// app.set('views', 'views');

//app.use(express.static(path.join(__dirname, 'statics')));

// app.get('/', (req, res, next)=>{
//     //res.render('index')
//     res.json({
//         "name" : "bra",
//         "age" : "ded"
//     });
// });