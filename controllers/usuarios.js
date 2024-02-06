const { response, request } = require('express')
const usuariosGet = (req= request, res= response) => {
    const {q,nombre = 'No name', page =1,limit} = req.query
    res.json({
        msg: 'get API - controller',
        q, 
        nombre,
        page,
        limit
    })
}
const usuariosPost = (req, res= response) => {
    const { nombre, dato} = req.body
    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        dato
    })
}
const usuariosPut = (req, res= response) => {
    const {id} = req.params
    res.status(500).json({
        msg: 'put API - controller',
        id
    })
}
const usuariosDelete = (req, res= response) => {
    res.json({
        msg: 'delete API - controller'
    })
}

module.exports = {usuariosGet, usuariosPost, usuariosPut, usuariosDelete}