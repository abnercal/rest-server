const { response } = require("express");
const { handleError } = require("../middlewares");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async( termino = '', res=response) => {
    const esMongoId = ObjectId.isValid( termino );

    if ( esMongoId ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ?  [usuario] : []
        })
    }

    const regex = new RegExp( termino, 'i'); //el termino es incensible a mayusculas y minusculas

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex} ],
        $and: [{estado: true}]
    })
    res.json({
        results:  usuarios
    })

}

const buscarCategorias = async( termino = '', res=response) => {
    const esMongoId = ObjectId.isValid( termino );

    if ( esMongoId ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ?  [categoria] : []
        })
    }

    const regex = new RegExp( termino, 'i'); //el termino es incensible a mayusculas y minusculas

    const categorias = await Categoria.find({ nombre: regex, estado: true })
    res.json({
        results:  categorias
    })

}

const buscarProductos = async( termino = '', res=response) => {
    const esMongoId = ObjectId.isValid( termino );

    if ( esMongoId ) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: ( producto ) ?  [producto] : []
        })
    }

    const regex = new RegExp( termino, 'i'); //el termino es incensible a mayusculas y minusculas

    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria','nombre');
    res.json({
        results:  productos
    })

}

exports.buscar = async(req, res = response) => {
    try {
        const { coleccion, termino} = req.params;
        
        if (!coleccionesPermitidas.includes( coleccion )) {
            handleError(res, `Las colecciones permitidas son: ${ coleccionesPermitidas }`, 400);
            return;
        }
        switch (coleccion) {
            case 'usuarios':
                buscarUsuarios(termino,res)
                break;
            case 'categorias':
                buscarCategorias(termino,res)
                break;
            case 'productos':
                buscarProductos(termino,res)
                break;
        
            default:
                /**res.json ({
            coleccion,
            termino
        }); */
                handleError(res, 'La busqueda no esta permitida', 400);
                break;
        }
    } catch (error) {
        handleError(res,"ERROR AL OBTENER ITEMS")
    }
    
}