const { Router } = require('express')

const { validarRegistro, validarUpdate, validarBorrar, validarObtenerId } = require('../validatios/producto')
const { obtenerProductos, obtenerProducto, crearProducto, updateProducto, borrarProducto } = require('../controllers/productos')

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id', validarObtenerId, obtenerProducto)

router.post('/', validarRegistro, crearProducto)

router.put('/:id', validarUpdate, updateProducto )

router.delete('/:id', validarBorrar, borrarProducto)

module.exports = router