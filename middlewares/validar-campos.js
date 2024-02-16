const { validationResult } = require('express-validator')

/**
 * Middleware para validar los datos de una solicitud HTTP y manejar los errores de validación
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarCampos = (req, res, next ) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

module.exports = {
    validarCampos
}