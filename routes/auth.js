const { Router } = require('express')
const { login } = require('../controllers/auth')
const { validarLogin } = require('../validatios/auth')


const router = Router()
router.post('/login', validarLogin,login )

module.exports = router