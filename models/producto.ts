import { Schema, model,  Document } from "mongoose";

export interface IProducto extends Document{
    nombre: string,
    estado: boolean,
    usuario: Schema.Types.ObjectId,
    precio?: number,
    categoria: Schema.Types.ObjectId,
    descripcion?: string,
    disponible?: boolean,
    img?:string
} 


const ProductoSchema: Schema = new Schema({
    nombre: {
	type: String,
	unique: true,
	required: [true, 'El nombre es obligatorio']
    },
    estado:{ 
	type: Boolean,
	required: [true, 'El estado es obligatorio'],
	default: true
    },
    usuario:{
	type: Schema.Types.ObjectId,
	ref: 'Usuario',
	required: true
    },
    precio:{
	type: Number,
	default: 0,
    },
    categoria:{
	type: Schema.Types.ObjectId,
	ref: 'Categoria', 
	required: true
    },
    descripcion:{
	type: String
    },
    disponible: {
	type:Boolean,
	default: true
    },
    img: {
	type: String
    }
});

ProductoSchema.methods.toJSON = function() {
    const {__v, estado, ...data} = this.toObject();	
    return data;
}

export default model<IProducto>('Producto', ProductoSchema);
