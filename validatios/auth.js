const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/utils')

const validarLogin = [
    check('correo','El correo es obligatorio')
    .isEmail(),
    check('password', 'La contrasena es obligatoria')
    .not()
    .isEmpty(),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
]

module.exports = {
    validarLogin
}