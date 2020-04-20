var bodyParser = require('body-parser')
var koneksi = require('./conn');
var response = require('./res');
var express= require ('express');
var router = express.Router();

router.use(bodyParser.json());
router.use(express.static('public'));

router.get('/all',function(req,res,next){
    var sql ="select*from jurusan";
    koneksi.query(sql,function(error,rows){
        if(error){
            res.status(400).json({
                message : 'data kosong'
            })
        }
        response.ok(rows,res);
    })
});

router.get('/:jurId',function(req,res,next){
    var user_id = req.params.jurId;
    var sql ="select*from jurusan where id=?";
    koneksi.query(sql,[user_id],function(error,rows){
        if(error){
           res.status(400).json({
               message : 'data dengan id tersebut'
           }) 
        }
        response.ok(rows,res);
        console.log(rows)
    })
    
});
    
router.post('/register',function(req,res,next){
    var nama=req.body.nama_jur;
    var kaprog=req.body.kaprog;
    var sql = "insert into jurusan(nama_jur,kaprog)values(?,?)";
    koneksi.query(sql,[nama,kaprog],function(error,rows){
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
    var nama=req.body.nama_jur;
    var kaprog=req.body.kaprog;
    var sql = "update jurusan set nama_jur=?,kaprog=? where id=?";
    koneksi.query(sql,[nama,kaprog,id],function(error,rows){
       if (error){
        res.status(400).json({
            message :'gagal update'
    })
        };
    response.ok('berhasil update user',res);
    });
});

router.delete('/hapus',function(req,res,next){
    var id = req.query.id;
    var sql ="delete from jurusan where id=?";
    koneksi.query(sql,[id],function(error,rows){
        if(error){
           res.status(400).json({
            message :'data kosong'

           });
}
response.ok('berhasil delete',res);
    })
})


module.exports = router;
