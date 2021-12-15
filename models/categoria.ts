
import { Schema, model,  Document } from "mongoose";

export interface ICategoria extends Document{
    nombre: string,
    estado: boolean,
    usuario: Schema.Types.ObjectId
} 


const CategoriaSchema: Schema = new Schema({
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
    }
});

CategoriaSchema.methods.toJSON = function(){
    const {__v,_id, estado, ...categoria} = this.toObject();
    categoria.uid =_id;
    return categoria;
}

export default model<ICategoria>('Categoria', CategoriaSchema);
