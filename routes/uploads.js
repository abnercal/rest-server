const { Router } = require('express')
const { cargarArchivo } = require('../controllers/uploads')


const router = Router()
router.post('/',cargarArchivo)

module.exports = router