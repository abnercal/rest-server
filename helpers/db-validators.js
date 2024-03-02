const { Usuario, Role, Categoria, Producto, Sucursal } = require('../models') 

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({ rol})

    if (!existeRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD `)
    }
}

const emailExiste = async( correo ='') => {

    //verificar correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        
        throw new Error(`El correo: ${ correo }, ya fue registrado anteriormente `)
    }
}

const existeUsuarioPorId = async( id ) => {

    //verificar correo existe
    const existeUsuario = await Usuario.findById( id )
    if (!existeUsuario) {
        
        throw new Error(`El id: ${ id }, no existe `)
    }
}

const existeCategoriaId = async( id ) => {

    //verificar correo existe
    const existeCatId = await Categoria.findById( id )
    if (!existeCatId) {
        
        throw new Error(`El id: ${ id }, no existe `)
    }
}

const existeProductoId = async( id ) => {

    //verificar correo existe
    const existeProdId = await Producto.findById( id )
    if (!existeProdId) {
        
        throw new Error(`El id: ${ id }, no existe `)
    }
}

const existeSucursalId = async( id ) => {

    //verificar correo existe
    const existeSucId = await Sucursal.findById( id )
    if (!existeSucId) {
        
        throw new Error(`El id: ${ id }, no existe `)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaId,
    existeProductoId,
    existeSucursalId
}