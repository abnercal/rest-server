const {Schema, model } = require('mongoose')

const SucursalSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatorio'],
    },
    pais: {
        type: String,
        required: true,
        trim:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
})

module.exports = model('Sucursal',SucursalSchema)