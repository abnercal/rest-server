const { response, request } = require('express')
const { Usuario } = require('../models') 
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req, res =response) => {
    const {correo, password} = req.body

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no válidos - correo'
            })
        }
        //Si el usuario existe
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no válidos - estado: false'
            })
        }

        //verificar la contrasena
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no válidos - contraseña'
            })
        }
        //generacion de jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            msg: 'Error interno del servidor. Por favor, contacta al administrador.'
        })
    }
    
}

module.exports = {
    login
}