var express = require('express');
var koneksi = require('./conn');
var response = require('./res');
var bodyparser = require('body-parser');
var router= express.Router();

router.use(bodyparser.json());

router.get('/all/:idKel',function(req,res,next){
    var sql ="select*from siswa where id_kel=?";
    var id_kel=req.params.idKel;
    koneksi.query(sql,id_kel,function(error,rows){
        if(error){
            res.status(400).json({
                message : 'data kosong'
            })
        } 
        response.ok(rows,res);
    })
});

router.get('/:siswaId',function(req,res,next){
    var siswaId = req.params.siswaId;
    var sql = "select * from siswa where id=?";
    koneksi.query(sql,[siswaId],(error,rows)=>{
        if(error){
            res.status(400).json({
                message : 'data siswa tidak ada'
        })
    };
    response.ok(rows,res);
    console.log(rows);
});
});
router.post('/register',function(req,res,next){
    var idkel=req.body.id_kel;
    var nis=req.body.nis;
    var nama=req.body.nama;
    var alamat=req.body.alamat;
    var jenkel=req.body.jen_kel;
    var ttl=req.body.ttl;
    var sql = "insert into siswa (id_kel,nis,nama,alamat,jen_kel,ttl ) values (?,?,?,?,?,?)";
    koneksi.query(sql,[idkel,nis,nama,alamat,jenkel,ttl],function(error,rows){
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
    var idkel=req.body.id_kel;
    var nis=req.body.nis;
    var nama=req.body.nama;
    var alamat=req.body.alamat;
    var jenkel=req.body.jen_kel;
    var ttl=req.body.ttl;
    var sql = "update siswa set id_kel=?, nis=?, nama=?,alamat=?, jen_kel=?, ttl=? where id=?";
    koneksi.query(sql,[idkel,nis,nama,alamat,jenkel,ttl,id],function(error,rows){
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
    var sql = "delete from siswa where id = ?";
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
