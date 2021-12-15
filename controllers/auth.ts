import { Response, Request } from "express"; 
import bcryptjs from "bcryptjs";

import {Usuario} from "../models";
import {generarJWT} from "../helpers/generarJWT";
import {googleVerify} from "../helpers/google-verify";

const login = async(req: Request<{},{},{
    correo: string,
    password: string
},{}>, res: Response) => {

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

const googleSignIn = async(req: Request, res: Response) =>{
    const {id_token} = req.body;
    try {
    const {nombre, img, correo} = await googleVerify(id_token);
    let usuario = await Usuario.findOne({correo}) ;
    if(!usuario) {
	const data = {	
	    nombre,
	    correo,
	    password:"IdontKnowWhyImStillAwake",
	    img,
	    rol:"USER",
	    google:true
	};
	usuario = await Usuario.create(data);
	console.log(usuario);
    }else {
	await usuario.updateOne({google: true})	
    }

    if(!usuario.estado){
	return res.status(401).json({
	    msg: 'Usuario bloqueado'
	})
    }
    
    // Generar el JWT	
    const jwt = await generarJWT( usuario.id );
    res.json({
	usuario,
	jwt
    })
    } catch (error) {
	res.status(400).json({
	    msg: 'El token no se pudo verificar',
	})	
    }
}

export {
    login,
    googleSignIn
}
