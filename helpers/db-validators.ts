import Schema from "mongoose";

import {
    Categoria,
    Producto,
    Usuario,
    Rol
} from "../models";


const esRolValido = async(rol = '') =>{

    const existeRol = await Rol.findOne({ rol });
	if(!existeRol) {
	    throw new Error(`El rol ${rol} no está registrado en la BD`);
		}
}

const existeCorreo = async(correo = '') =>{
    //Verificar si el correo existe
    const existeE = await Usuario.findOne({correo});
    if(existeE){
	throw new Error('El correo ya está registrado')
    }
}

const existeUsuarioById = async(id: Schema.ObjectId) =>{
    //Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
	throw new Error('El id no existe ')
    }
}

const existeCategoriaById = async(id:Schema.ObjectId) =>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
	throw new Error(`La categoría no existe`);
    }
}

const existeProductoById = async(id: Schema.ObjectId) =>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
	throw new Error(`El producto no existe`);
    }

}

export {
    existeCategoriaById,
    existeUsuarioById,
    existeCorreo,
    existeProductoById,
    esRolValido
}

