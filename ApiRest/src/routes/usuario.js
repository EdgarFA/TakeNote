const router = require('express').Router();
const mongojs = require('mongojs');

//CONEXION
const db = mongojs('TakeNote',['usuarios']);

//GET de listado de todos los usuario
router.get('/usuarios',(req,res,next)=>{
    db.usuarios.find((err,usuarios)=>{
        if(err) return console.log(err);
        res.json(usuarios);
    });
});


//GET para localizar un usuario por nombre y password
router.get('/usuarios/:usuario/:password',(req,res,next)=>{
    db.usuarios.findOne({usuario:req.params.usuario,password:req.params.password},(err,usuarios)=>{        
        if(err) return console.log(err);
        res.json(usuarios);
    });
});

//POST para generar un usuario nuevo
router.post('/usuarios',(req,res,next)=>{
    const usuario = req.body;
    if(!usuario.usuario){
        res.status(400).json({
            error:'Faltan datos '
        });
    }
    else
    {
        db.usuarios.save(usuario,(err,usuario)=>{
            if(err) return console.log(err);
            res.json(usuario);
        })
    } 
});

//DELETE un usuario por ID
router.delete('/usuarios/:id',(req,res,next)=>{
    db.usuarios.remove({_id: mongojs.ObjectId(req.params.id)},(err,result)=>{
        if(err) return console.log(err);
        res.json(result);
    });
});

//PUT actualizar un usuario por ID
router.put('/usuarios/:id',(req,res,next)=>{
    
    const usuario = req.body;
    let usuarioUpdate = {};

    if(usuario.usuario){
        usuarioUpdate.usuario= usuario.usuario;
    }

    if(usuario.password){
        usuarioUpdate.password= usuario.password;
    }   
    if(usuario.nombre){
        usuarioUpdate.nombre= usuario.nombre;
    }
    
    if(usuario.apellidos){
        usuarioUpdate.apellidos= usuario.apellidos;
    }   

    if(usuario.nacimiento){
        usuarioUpdate.nacimiento= usuario.nacimiento;
    }   

    if(usuario.email){
        usuarioUpdate.email= usuario.email;
    }   

    if(usuario.alta){
        usuarioUpdate.alta= usuario.alta;
    }   

    if(!usuarioUpdate){
        res.status(400).json({
            error: 'No hay datos para actualizar'
        })
    }

    db.usuarios.update({_id: mongojs.ObjectId(req.params.id)},usuarioUpdate,(err,result)=>{
        if(err) return console.log(err);
        res.json(result);
    });
});

module.exports = router;