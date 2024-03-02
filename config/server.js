const express = require("express");
const cors = require('cors');
const { dbConnection } = require("./dbconfig");
//cors permite proteger el servidor
class Server {
    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            sucursales: '/api/sucursales',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }

        //Conectar a base de datos
        this.conectarDB()
        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }
    async conectarDB() {
        await dbConnection()
    }
    middlewares() {
        //cors
        this.app.use( cors() )

        //Parseo y lectura del body
        this.app.use( express.json() )

        //Direccion publica
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.sucursales, require('../routes/sucursales'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
        this.app.use('*',(req,res) => {
            res.status(404).json({
                errors: {
                    msg:'URL_NOT_FOUND'
                }
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Backend Up en http://localhost:${this.port}`);
          });        
    }
}

module.exports = Server