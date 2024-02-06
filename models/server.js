const express = require("express");
const cors = require('cors')
//cors permite proteger el servidor
class Server {
    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || 3000;
        this.usuariosPath ='/api/usuarios';
        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
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