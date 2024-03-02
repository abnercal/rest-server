const { response, request } = require("express");
const { Categoria } = require("../models");
const { handleError } = require("../middlewares");


exports.obtenerCategorias = async(req = require, res= response) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { estado: true }

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip( Number( desde ))
                .limit( Number( limite ))
                .populate('usuario','nombre')
        ])
        
        res.json({total,categorias})
    } catch (error) {
        handleError(res,"ERROR AL OBTENER CATEGORIAS")
    }
}

exports.obtenerCategoria = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const categoria = await Categoria.findById( id ).populate('usuario','nombre');
        
        res.json( categoria )
        
    } catch (error) {
        handleError(res,"ERROR AL OBTENER CATEGORIA")
    }
}

exports.crearCategoria = async(req= request, res = response) => { 
    
    try {
        const nombre = req.body.nombre.toUpperCase();
        
        const categoriaDB = await Categoria.findOne({ nombre })

        if (categoriaDB) {
            handleError(res, `La categoria ${ categoriaDB.nombre }, ya existe`, 400);
            return;
        }
        //Generar Data a guardar
        const data = {
            nombre, 
            usuario: req.usuario._id
        }

        const categoria = new Categoria( data );
        //Guardar DB
        await categoria.save();

        res.status(201).json(categoria)
        
    } catch (error) {
        console.log(error)
        handleError(res,"ERROR AL CREAR CATEGORIA")       
    }
    
}

exports.updateCategoria = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const { estado, usuario, ...data } = req.body
        
        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.usuario._id

        const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true} )
        res.json( categoria )
    } catch (error) {
        handleError(res,"ERROR AL ACTUALIZAR CATEGORIA")
    }
}

exports.borrarCategoria = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const categoria = await Categoria.findByIdAndUpdate( id, {estado: false}, {new: true})

        res.json(categoria)
        
    } catch (error) {
        handleError(res,"ERROR AL BORRAR CATEGORIA")
    }
}