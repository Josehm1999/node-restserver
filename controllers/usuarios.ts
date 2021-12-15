import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import {Usuario} from "../models";


const getUsuarios = async( req: Request, res: Response )=>{
    
    const limite: Number = Number(req.query.limite) || 5;
    const desde: Number = Number(req.query.desde) || 0;
    
    const query = { estado: true };

    const [usuarios, total] = await Promise.all([
	Usuario.find(query)
	.skip(Number(desde))
	.limit(Number(limite)),
	Usuario.countDocuments(query)
    ]);   

    res.json({
	usuarios,
	total
    })

};

const getUsuario = async ( req: Request, res: Response )=>{
    const {id} = req.params;

    const usuario = await Usuario.findById(id);

    res.json({
	usuario
   })
};


const postUsuario = async( req: Request, res: Response )=>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({
	nombre,
	correo,
	password,
	rol
    }); 
    
    // Encriptar la contraseña
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt); 
    
    // Guardar en BD
    await usuario.save();

    try {
       res.json({
 	   usuario
	})
    } catch (error) {
	console.log(error);	
	res.status(500).json({
	msg:'Hable con el administrador',
    })    
    };

};


const putUsuario = async( req: Request, res: Response )=>{
    const {id} = req.params;
    const {_id, password, google,correo, ...resto} = req.body;
    
    // Validadr contra base de datos
    if (password){
	const salt = bcryptjs.genSaltSync();
	resto.password = bcryptjs.hashSync(password,salt); 
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);

};

const deleteUsuario = async( req: Request, res: Response )=>{

    const {id} = req.params;

    //Cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioA = req.body.usuarioAutorizado;
    res.json({usuario, usuarioA});
};


const patchUsuario = (req:Request, res: Response) =>{
    res.status(200).json({
	msg: 'Ruta aún no implementada'
    })
}

export {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    patchUsuario
}


