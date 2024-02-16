const { Router } = require('express')
const { usuariosGet, 
    usuariosDelete, 
    usuariosPost, 
    usuariosPut 
} = require('../controllers/usuarios')

const { validarRegistro, validarUpdate, validarBorrar } = require('../validatios/usuario')

const router = Router()

router.get('/', usuariosGet )

router.post('/', validarRegistro, usuariosPost )

router.put('/:id', validarUpdate ,usuariosPut )

router.delete('/:id', validarBorrar, usuariosDelete )

module.exports = router