'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

//Creamos el toquen donde guarda el ID de usuario, la fecha de inicio y de expiracions
function createToken (usuario) {
  const payload = {
    sub: usuario._id,
    iat: moment().unix(),
    exp: moment().add(99, 'years').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

//Desencriptamos el token donde obtenemos el id del usuario y si es valido
function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)  
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      resolve(payload.sub)
    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })
  return decoded
}

module.exports = {
  createToken,
  decodeToken
}