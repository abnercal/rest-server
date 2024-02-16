const { validationResult } = require('express-validator')

/**
 * Middleware para validar los datos de una solicitud HTTP y manejar los errores de validación
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.validationResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()        
    } catch (err) {
        res.status(403);
        res.send({error: err.array()})
    }
}
exports.validarCampos = (req, res, next ) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

/**
 * esta función handleError se utiliza para enviar respuestas de error en formato JSON 
 * con un código de estado HTTP y un mensaje de error personalizado
 * @param {*} res 
 * @param {*} message 
 * @param {*} code 
 */
exports.handleError = ( res, message = 'Algo Sucedio', code = 403) => {
    res.status( code );
    res.send({ error: message });
}