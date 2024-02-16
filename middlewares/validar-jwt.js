const  { request, response } = require('express')

const jwt = require('jsonwebtoken')
const { Usuario } = require('../models') 

exports.validarJWT = async (req= request, res= response,next ) => {
    const token = req.header('x-token');
    if (!token) {

        return res.status(400).json({
            msg: 'No existe un token en la peticion'
        });
        
    }
    try {

        const {uid} = jwt.verify( token,  process.env.SECRTORPRIVATEKEY) //se valida el token

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe enDB'
            }); 
        }

        //Verificar si el uid tiene el estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido'
            }); 
        }

        req.usuario= usuario;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Token no valido'
        })
    }
}

