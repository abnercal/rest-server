const { Router } = require('express')
const { usuariosGet, 
    usuariosDelete, 
    usuariosPost, 
    usuariosPut, 
    perfil
} = require('../controllers/usuarios')

const { validarRegistro, validarUpdate, validarBorrar, validarUsuario } = require('../validatios/usuario')

const router = Router()

router.get('/', usuariosGet )

router.get("/perfil", validarUsuario, perfil);

router.post('/', validarRegistro, usuariosPost )

router.put('/:id', validarUpdate ,usuariosPut )

router.delete('/:id', validarBorrar, usuariosDelete )

module.exports = router