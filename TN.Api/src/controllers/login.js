'use strict'

const Usuario = require('../models/usuario')
const service = require('../services')
const encrypt = require('../middlewares/encrypt')

function signUp (req, res) {
    const usuario = new Usuario({
      email: req.body.email,
      password: req.body.password,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      nacimiento: req.body.nacimiento,
      alta: Date.now(),
      acceso: Date.now()
    })
    
    usuario.password=encrypt.encrypt(usuario.password);

    usuario.save((err) => {
      if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
  
      return res.status(201).send({ token: service.createToken(usuario) })
    })
  }
  
  function signIn (req, res) {

    let password = encrypt.encrypt(req.body.password);
    Usuario.findOne({ email: req.body.email,password: password }, (err, usuario) => {
      if (err) return res.status(500).send({ message: err })
      if (!usuario) return res.status(404).send({ message: 'No existe el usuario' })  

      req.user = usuario
      res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(usuario)
      })
    })
  }
  
  module.exports = {
    signUp,
    signIn
  }