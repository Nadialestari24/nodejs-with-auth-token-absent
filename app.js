const express = require('express');
const app = express ();
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser=require('body-parser');

const jurusanRouters = require('./routes/jurusan');
const kelasRouters = require('./routes/kelas');
const siswaRouters = require('./routes/siswa');
const pengabsenRouters = require('./routes/pengabsen');
const absenRouters = require('./routes/absen');
const koneksi = require('./routes/conn');
//const user = require('./routes/user');
const postRoutes = require('./routes/post');
const morgan = require ('morgan');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/jurusan',jurusanRouters);
app.use('/kelas',kelasRouters);
app.use('/siswa',siswaRouters);
app.use('/absen',absenRouters);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
global.db = koneksi;
//app.post('/signup',user.signup);
app.use('/pengabsen',pengabsenRouters);
app.use('/getuser',postRoutes);


module.exports=app;

