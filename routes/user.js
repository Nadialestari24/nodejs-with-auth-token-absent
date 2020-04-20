var express = require('express');
var koneksi = require('./conn');
var response = require('./res');
var bodyparser = require('body-parser');
var router= express.Router();
router.use(bodyparser.json());

