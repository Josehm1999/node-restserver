import { Response, Request } from "express"; 
import bcryptjs from "bcryptjs";

import Usuario from "../models/usuario";
import {generarJWT} from "../helpers/generarJWT";

type reqBody = {
    correo: string,
    password: string
}

export const login = async(req: Request<{},{},reqBody,{}>, res: Response) => {

    const {correo, password} = req.body;

    try{
	// Verificar si el usuario existe
	const usuario = await Usuario.findOne({correo});
	if (!usuario) { 
	    return res.status(400).json({
		msg: 'Usuario / Password no son correctos'
	    })
	}

	// Verificar si el usuario está activo
	if(!usuario){
	    return res.status(400).json({
		msg: 'Usuario / Password no son correctos - estado: false'
	    })
	}

	// Verificar la contraseña
	const validarPassword = bcryptjs.compareSync(password, usuario.password);
	if(!validarPassword){
	    return res.status(400).json({
		msg: 'Usuario / Password no son correctos - password'
	    })
	}

	// Generar el JWT
	const jwt = await generarJWT( usuario.id );
 

	res.json({
	    usuario,
	    jwt
	}) 
    }catch(error){
	console.log(error);
	res.status(500).json({
	    msg: 'Algo salió mal'
	})
    }


}
