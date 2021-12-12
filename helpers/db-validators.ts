import Rol from "../models/rol";
import Usuario from "../models/usuario";
import Schema from "mongoose";

export const esRolValido = async(rol = '') =>{

    const existeRol = await Rol.findOne({ rol });
	if(!existeRol) {
	    throw new Error(`El rol ${rol} no está registrado en la BD`);
		}
}

export const existeCorreo = async(correo = '') =>{
    //Verificar si el correo existe
    const existeE = await Usuario.findOne({correo});
    if(existeE){
	throw new Error('El correo ya está registrado')
    }
}

export const existeUsuarioById = async(id: Schema.ObjectId) =>{
    //Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
	throw new Error('El id no existe ${ id }')
    }
}


