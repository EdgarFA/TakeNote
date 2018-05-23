'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UsuarioSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String},
  nombre: { type: String},
  apellidos: { type: String},
  nacimiento: { type: Date},
  alta: { type: Date},
  acceso:{ type: Date}
})


module.exports = mongoose.model('Usuario', UsuarioSchema)
