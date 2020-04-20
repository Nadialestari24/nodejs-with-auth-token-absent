var express = require('express');
var koneksi = require('./conn');
var response = require('./res');
var bodyparser = require('body-parser');
var router= express.Router();

router.use(bodyparser.json());

router.get('/all/:idJur',function(req,res,next){
    var sql ="select*from kelas where id_jur=?";
    var id_jur=req.params.idJur;
    koneksi.query(sql,id_jur,function(error,rows){
        if(error){
            res.status(400).json({
                message : 'data kosong'
            })
        }
        response.ok(rows,res);
    })
});

router.get('/satukelas/:kelId',function(req,res,next){
    var kelasId = req.params.kelId;
    var sql = "select * from kelas where id=?";
    koneksi.query(sql,[kelasId],(error,rows)=>{
        if(error){
            res.status(400).json({
                message : 'data kelas tidak ada'
        })
    };
    response.ok(rows,res);
    console.log(rows);
});
});

router.post('/register',function(req,res,next){
    var idjur=req.body.id_jur;
    var namakel=req.body.nama_kel;
    var walikel=req.body.wali_kel;
    var sql = "insert into kelas(id_jur,nama_kel,wali_kel)values(?,?,?)";
    koneksi.query(sql,[idjur,namakel,walikel],function(error,rows){
        if(error){
            res.status(400).json({
                message : 'gagal insert'
            })

        };
    response.ok('berhasil insert',res);

    })
});


router.put('/ubah',function(req,res,next){
    var id = req.query.id;
    var idjur=req.body.id_jur;
    var namakel=req.body.nama_kel;
    var walikel=req.body.wali_kel;
    var sql = "update kelas set id_jur=?,nama_kel=?, wali_kel=? where id=?";
    koneksi.query(sql,[idjur,namakel,walikel,id],function(error,rows){
       if (error){
        res.status(400).json({
            message :'gagal update'
    })
        };
    response.ok('berhasil update user',res);
    });
});

router.delete('/hapus/:id',function (req,res,next){
    var user_id = req.params.id;
    var sql = "delete from kelas where id = ?";
    koneksi.query(sql,[user_id],function(error,rows){
        if(error){
            res.status(400).json({
                message : 'gagal menghapus user'

            });
        }
        res.json({
            pesan:"berhasil hapus"
        })
        console.log(rows);
        
    });
});
    module.exports=router;
