const validarJWT = require('../middlewares/validar-jwt')
const validarRoles = require('../middlewares/validar-roles')
const utils = require('../middlewares/utils')

module.exports = {
    ...validarJWT,
    ...validarRoles,
    ...utils
}