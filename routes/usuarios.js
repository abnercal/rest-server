const { Router } = require('express')
const { usuariosGet, 
    usuariosDelete, 
    usuariosPost, 
    usuariosPut } = require('../controllers/usuarios')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')


const router = Router()

router.get('/', usuariosGet )

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol','No es un rol permitido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('rol').custom( esRoleValido ),
    validarCampos
] , usuariosPost )

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPut )

router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete )


module.exports = router