const { response } = require("express");


exports.cargarArchivo = (req, res= response) => {

    res.json({
        msg: 'Hola mundo'
    })
}