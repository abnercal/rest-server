const { check } = require('express-validator')
const {
    validarCampos,
    validarJWT, 
    tieneRole,
    esAdminRole
} = require('../middlewares')

const { existeSucursalId } = require('../helpers/db-validators')

exports.validarObtenerId = [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeSucursalId ),
    validarCampos
];

exports.validarRegistro = [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
exports.validarUpdate = [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeSucursalId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];

exports.validarBorrar = [
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeSucursalId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
