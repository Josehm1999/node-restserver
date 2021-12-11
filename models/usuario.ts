import {Schema, model, Document} from "mongoose"


export interface IUsuario extends Document {
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado?: Boolean,
    google?: Boolean
}

const UsuarioSchema: Schema = new Schema({
    nombre: {
	type: String,
	required: [true, 'El nombre es obligatorio']
    },
    correo: {
	type: String,
	required: [true, 'El nombre es obligatorio'],
	unique:true
    },
    password: {
	type: String,
	required: [true, 'La contraseña es obligatoria']
    },
    img: {
	type: String
    },
    rol: {
	type: String,
	required: true,
	enum: ['ADMIN', 'USER']
    },
    estado: {
	type: Boolean,
	default: true
    },
    google: {
	type: Boolean,
	default: false
    } 
});

UsuarioSchema.methods.toJSON = function() {

    const {__v, password, ...usuario} = this.toObject();
    return usuario; 
}


export default model<IUsuario>('Usuario', UsuarioSchema);
