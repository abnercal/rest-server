const { Router } = require('express')

const { validarRegistro, validarUpdate, validarBorrar, validarObtenerId } = require('../validatios/categoria')
const { crearCategoria, obtenerCategorias, obtenerCategoria, updateCategoria, borrarCategoria } = require('../controllers/categorias')

const router = Router()

router.get('/', obtenerCategorias)

router.get('/:id', validarObtenerId,obtenerCategoria)

router.post('/', validarRegistro, crearCategoria)

router.put('/:id', validarUpdate, updateCategoria )

router.delete('/:id', validarBorrar, borrarCategoria)

module.exports = router