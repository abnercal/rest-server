const { check } = require('express-validator')
const {
    validarCampos,
    validarJWT, 
    tieneRole,
    esAdminRole
} = require('../middlewares')

const { existeCategoriaId, existeProductoId } = require('../helpers/db-validators')

exports.validarObtenerId = [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos
];

exports.validarRegistro = [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
exports.validarUpdate = [
    validarJWT,
    //check('categoria','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];

exports.validarBorrar = [
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
