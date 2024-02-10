const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");
//cors permite proteger el servidor
class Server {
    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || 3000;
        this.usuariosPath ='/api/usuarios';

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
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Backend Up en http://localhost:${this.port}`);
          });        
    }
}

module.exports = Server