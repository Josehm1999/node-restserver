import { Request, Response, NextFunction } from "express";
import {IProducto, IUsuario, Producto, Usuario} from "../models";

const coleccionValidator = async(req: Request<{id: string , coleccion: string},{}, {modelo: IUsuario | IProducto | null },{}>, res: Response, next: NextFunction)=>{
    
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
    	case 'usuarios':
	   modelo = await Usuario.findById(id);
	    if(!modelo){
		return res.status(400).json({
		    msg: `No existe un usuario con id ${id}`
		})
	    }
    		break;

    	case 'productos':
	   modelo = await Producto.findById(id);
	    if(!modelo){
		return res.status(400).json({
		    msg: `No existe un producto con id ${id}`
		})
	    }
    		break;
    	default:
	    return res.status(500).json({
	    msg: 'Ruta no implementada'
	    })
    }
    req.body.modelo = modelo;
    next();
};

export default coleccionValidator;
