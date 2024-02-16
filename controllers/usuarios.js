const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const { Usuario } = require('../models')
const { handleError } = require('../middlewares')

exports.usuariosGet = async(req= request, res= response) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { estado: true};

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip( Number( desde ))   
                .limit(Number( limite ))
        ])

        res.json({
            total,
            usuarios
        })
    } catch (error) {
        handleError(res,"ERROR AL OBTENER ITEMS")
    }
}
exports.usuariosPost = async (req, res= response) => {
    try {
        const {nombre, correo, password, rol} = req.body
    
        //instancia creada
        const usuario = new Usuario( {nombre, correo, password, rol} )

        //encriptar la contrasena
        const salt = bcryptjs.genSaltSync()
        usuario.password = bcryptjs.hashSync( password, salt )

        //guardar en DB
        await usuario.save()

        res.status(201).json({
            usuario
        })

    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_REGISTRO_USUARIO");
    }
    
}
exports.usuariosPut = async(req, res= response) => {
    try {
        const {id} = req.params
        const { _id, password, google, correo, ...resto } = req.body
    
        //Todo validar contra la base de datos
        if ( password ) {
            const salt = bcryptjs.genSaltSync()
            resto.password = bcryptjs.hashSync( password, salt )
        }
        const usuario = await Usuario.findByIdAndUpdate( id, resto )
        res.json( usuario )
    } catch (error) {
        handleError(res, "ERROR_UPDATE_ITEMS");
    }
    
}
exports.usuariosDelete = async(req, res= response) => {
    try {
        const {id} = req.params
        const usuario = await Usuario.findByIdAndUpdate( id, {estado: false})
        //const usuarioAutenticado = req.usuario;//esto es para saber que usuario fue quien borro

        res.json({usuario})
        //res.json( {usuario, usuarioAutenticado} )
    } catch (error) {
        console.log(error)
        handleError(res,"ERROR_DELETE_ITEM")
    }
}