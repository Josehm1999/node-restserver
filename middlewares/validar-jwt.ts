import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import Usuario, {IUsuario} from "../models/usuario";


const validarJWT = async(req: Request<{},{}, {usuarioAutorizado: IUsuario},{}>, res: Response, next: NextFunction) =>{
    
    const token = req.header('x-token');
    if(!token){
	return res.status(401).json({
	    msg: 'No hay token en la petición'
	}); 
    }
    
    try {
	const {uid} = jwt.verify(token,`${process.env.SECRETORPRIVATEKEY}`) as any;
	const usuario = await Usuario.findById(uid);
	
	if(!usuario){
	    return res.status(401).json({
		msg: 'Token no válido - usuario no existe en la DB'
	    })
	}

	if(!usuario.estado){
	    return res.status(401).json({
		msg: 'Token no válido - usuario con estado: false'
	    })
	}
	req.body.usuarioAutorizado = usuario;
	next();

    } catch (error) {
	
	console.log(error);
	res.status(400).json({
	    msg: 'Token no válido'
	})
    } 



}


export default validarJWT
