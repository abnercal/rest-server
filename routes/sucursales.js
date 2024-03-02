const { Router } = require('express')

const { validarRegistro, validarUpdate, validarBorrar, validarObtenerId } = require('../validatios/sucursal')
const { obtenerSucursales, obtenerSucursal, crearSucursal, borrarSucursal } = require('../controllers/sucursales')

const router = Router()

router.get('/', obtenerSucursales)

router.get('/:id', validarObtenerId, obtenerSucursal)

router.post('/', validarRegistro, crearSucursal)

//router.put('/:id', validarUpdate, updateProducto )

router.delete('/:id', validarBorrar, borrarSucursal)

module.exports = router