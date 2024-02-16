const { check } = require('express-validator')
const {
    validarCampos,
    validarJWT,
    esAdminRole, 
    tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

exports.validarRegistro = [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol','No es un rol permitido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('rol').custom( esRoleValido ),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
exports.validarUpdate = [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];

exports.validarBorrar = [
    validarJWT,
    //esAdminRole,//esta validacion fuerza que tenga el rol requerido
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    (req, res, next) => {
        return validarCampos(req, res, next)
    }
];
