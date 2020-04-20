
'use strict';
exports.ok= function(value,res){
    var data = {
        'statusnya': 400, 
        'values' : value,

    };
    res.json (data);
    res.end();
}