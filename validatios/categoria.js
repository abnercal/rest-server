const { check } = require('express-validator')
const {
    validarCampos,
    validarJWT, 
    tieneRole,
    esAdminRole
} = require('../middlewares')

const { existeCategoriaId } = require('../helpers/db-validators')

exports.validarObtenerId = [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
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
    check('id').custom(existeCategoriaId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];

exports.validarBorrar = [
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
