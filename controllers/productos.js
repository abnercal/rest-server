const { response, request } = require("express");
const { Producto } = require("../models");
const { handleError } = require("../middlewares");
const { body } = require("express-validator");


exports.obtenerProductos = async(req = require, res= response) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { estado: true }

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip( Number( desde ))
                .limit( Number( limite ))
                .populate('usuario','nombre')
                .populate('categoria','nombre')
        ])
        
        res.json({total,productos})
    } catch (error) {
        handleError(res,"ERROR AL OBTENER PRODUCTOS")
    }
}

exports.obtenerProducto = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const producto = await Producto.findById( id ).populate('usuario','nombre').populate('categoria','nombre');
        
        res.json( producto )
        
    } catch (error) {
        handleError(res,"ERROR AL OBTENER PRODUCTO")
    }
}

/* exports.crearProducto = async(req= request, res = response) => { 
    
    try {
        const {estado, usuario, ...body } = req.body;
        
        const productoDB = await Producto.findOne({ nombre: body.nombre })

        if (productoDB) {
            handleError(res, `El producto ${ productoDB.nombre }, ya existe`, 400);
            return;
        }
        //Generar Data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(), 
            usuario: req.usuario._id
        }

        const producto = new Producto( data );
        //Guardar DB
        await producto.save();

        res.status(201).json(producto)
        
    } catch (error) {
        console.log(error)
        handleError(res,"ERROR AL CREAR PRODUCTO")       
    }
    
} */

exports.crearProducto = async (req = request, res = response) => {
    try {
        const productos = req.body; // Ahora req.body será un arreglo de productos
        const nuevosProductos = [];

        for (let i = 0; i < productos.length; i++) {
            const { estado, usuario, ...body } = productos[i];
            
            const productoDB = await Producto.findOne({ nombre: body.nombre });

            if (productoDB) {
                handleError(res, `El producto ${productoDB.nombre} ya existe`, 400);
                return;
            }

            // Generar Data a guardar
            const data = {
                ...body,
                nombre: body.nombre.toUpperCase(),
                usuario: req.usuario._id
            };

            const producto = new Producto(data);
            // Guardar DB
            await producto.save();
            nuevosProductos.push(producto);
        }

        res.status(201).json(nuevosProductos);
    } catch (error) {
        console.log(error);
        handleError(res, "ERROR AL CREAR PRODUCTO");
    }
}

exports.updateProducto = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const { estado, usuario, ...data } = req.body
        
        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase()
        }
        
        data.usuario = req.usuario._id

        const producto = await Producto.findByIdAndUpdate( id, data, {new: true} )
        res.json( producto )
    } catch (error) {
        handleError(res,"ERROR AL ACTUALIZAR PRODUCTO")
    }
}

exports.borrarProducto = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const producto = await Producto.findByIdAndUpdate( id, {estado: false}, {new: true})

        res.json( producto )
        
    } catch (error) {
        handleError(res,"ERROR AL BORRAR PRODUCTO")
    }
}