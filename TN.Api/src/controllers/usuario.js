'use strict'

const Usuario = require('../models/usuario')


function getAllUser(req,res){
    
    Usuario.find((err,usuarios)=>{
        if(err) return console.log(err);
        res.json(usuarios);
    });
}

function getUser(req,res){
    Usuario.findOne({usuario:req.params.usuario,password:req.params.password},(err,usuarios)=>{        
        if(err) return console.log(err);
        res.json(usuarios);
    });
}

function addUser(req,res){
    const usuario = req.body;
    Usuario.save(usuario,(err,usuario)=>{
        if(err) return console.log(err);
        res.json(usuario);
    })
}

function delUser(req,res){
    Usuario.remove({_id: req.params.id},(err,result)=>{
        if(err) return console.log(err);
        res.json(result);
    })
}

function updateUser(req,res){
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
    
    Usuario.update({_id: req.params.id},usuarioUpdate,(err,result)=>{
        if(err) return console.log(err);
        res.json(result);
    });
}


module.exports = {
    getAllUser,
    getUser,
    addUser,
    delUser,
    updateUser
};