const { response,request} = require("express")
const { Sucursal } = require("../models");
const { handleError } = require("../middlewares");
const { body } = require("express-validator");

exports.obtenerSucursales = async(req = require, res= response) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { estado: true }

        const [total, sucursales] = await Promise.all([
            Sucursal.countDocuments(query),
            Sucursal.find(query)
                .skip( Number( desde ))
                .limit( Number( limite ))
        ])
        
        res.json({total,sucursales})
    } catch (error) {
        handleError(res,"ERROR AL OBTENER SUCURSALES")
    }
}

exports.obtenerSucursal = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const sucursal = await Sucursal.findById( id );
        
        res.json( sucursal )
        
    } catch (error) {
        handleError(res,"ERROR AL OBTENER SUCURSAL")
    }
}

exports.crearSucursal = async(req= request, res = response) => { 
    
    try {
        const {...body } = req.body;
        const sucursalDB = await Sucursal.findOne({ nombre: body.nombre })

        if (sucursalDB) {
            handleError(res, `La sucursal ${ sucursalDB.nombre }, ya existe`, 400);
            return;
        }
        //Generar Data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        const sucursal = new Sucursal( data );
        //Guardar DB
        await sucursal.save();

        res.status(201).json(sucursal)
        
    } catch (error) {
        console.log(error)
        handleError(res,"ERROR AL CREAR SUCURSAL")       
    }
    
}

exports.borrarSucursal = async(req = require, res= response) => {
    try {
        const {id} = req.params
        const sucursal = await Sucursal.findByIdAndUpdate( id, {estado: false}, {new: true})

        res.json( sucursal )
        
    } catch (error) {
        handleError(res,"ERROR AL BORRAR SUCURSAL")
    }
}