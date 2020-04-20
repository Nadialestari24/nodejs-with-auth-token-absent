var mysql= require('mysql');
var con = mysql.createConnection({
    host:"",
    user:"root",
    password:"",
    database:"absensi"
});

con.connect(function(err){
    if(err)throw err;
});
module.exports = con;
