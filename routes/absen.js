var express = require('express');
var koneksi = require('./conn');
var response = require('./res');
var bodyparser = require('body-parser');
var router= express.Router();

router.use(bodyparser.json());

router.get('/all/:idSis',function(req,res,next){
    var sql ="select*from absen where id_sis=?";
    koneksi.query(sql,function(error,rows){
        if(error){
            res.status(400).json({
                message : 'data kosong'
            })
        }
        response.ok(rows,res);
    })
});

router.get('/id/:id',function(req,res,next){
    var idsis = req.params.id;
    var sql = "select * from absen where id=?";
    koneksi.query(sql,[idsis],(error,rows)=>{
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
    var id_sis=req.body.id_sis;
    var id_pengab=req.body.id_pengab;
    var ft_srt=req.body.fto_srt;
    var ket=req.body.ket;
    var tgl=req.body.tgl;
    var sql = "insert into absen(id_sis,id_pengab,fto_srt,ket,tgl)values(?,?,?,?,?)";
    koneksi.query(sql,[id_sis,id_pengab,ft_srt,ket,tgl],function(error,rows){
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
    var id_sis=req.body.id_sis;
    var id_pengab=req.body.id_pengab;
    var ft_srt=req.body.fto_srt;
    var ket=req.body.ket;
    var tgl=req.body.tgl;
    var sql = "update absen set id_sis=?, id_pengab=?, fto_srt=?, ket=?, tgl=?  where id=?";
    koneksi.query(sql,[id_sis,id_pengab,ft_srt,ket,tgl,id],function(error,rows){
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
    var sql = "delete from absen where id = ?";
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
