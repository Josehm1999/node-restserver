import {Request, Response} from "express";
import {Types} from 'mongoose';
import { Usuario, Categoria, Producto } from "../models";
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res: Response ) =>{
    const esMongoId = Types.ObjectId.isValid(termino);

    if(esMongoId){
	const usuario = await Usuario.findById(termino);
	return res.json({
	    results: (usuario) ? [usuario]: []
	});
    }

	const regex = new RegExp(termino, 'i');

	const usuario = await Usuario.find({

	    $or: [{nombre: regex},{correo: regex}],
	    $and: [{estado: true}]
	});
	res.json({
	     results: usuario
	});
}

const buscarCategorias = async( termino = '', res: Response ) =>{
    const esMongoId = Types.ObjectId.isValid(termino);

    if(esMongoId){
	const categoria = await Categoria.findById(termino);
	return res.json({
	    results: (categoria) ? [categoria]: []
	});
    }

	const regex = new RegExp(termino, 'i');

	const categoria = await Categoria.find({
	    nombre: regex,
	    estado: true
	});
	res.json({
	     results: categoria
	});
}
const buscarProductos = async( termino = '', res: Response ) =>{
    const esMongoId = Types.ObjectId.isValid(termino);

    if(esMongoId){
	const producto = await Producto.findById(termino).populate('categoria', 'nombre');
	return res.json({
	    results: (producto) ? [producto]: []
	});
    }

	const regex = new RegExp(termino, 'i');

	const producto = await Producto.find({
	    nombre: regex,
	    estado: true
	}).populate('categoria','nombre');

	res.json({
	     results: producto 
	});
}


const buscar = ( req: Request, res: Response ) =>{
    
    const {coleccion, termino} = req.params;
   
    if(!coleccionesPermitidas.includes(coleccion)){
	return res.status(400).json({

	    msg: `Las colecciones permitidas son:${coleccionesPermitidas} `
	})
    }

    switch (coleccion) {
    	case 'usuarios':
		buscarUsuarios(termino, res);	
    		break;

    	case 'roles':
	    res.status(404).json({
	    	msg: 'Ruta aun no implementada'
	    })
    		break;

    	case 'categorias':
    		buscarCategorias(termino, res);
    		break;

    	case 'productos':
    		buscarProductos(termino, res);
    		break;

    	default:
	    res.status(500).json({
	    msg: 'Ruta aun no implementada'
	})
    		break;
    }
}


export {
    buscar
}
