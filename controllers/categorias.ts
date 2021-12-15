import {Request, Response} from "express";
import { Categoria, ICategoria, IUsuario } from "../models";

type ReqBody ={
    usuarioAutorizado: IUsuario,
    nombre: string
}

// Obtener categorias - paginado - total - populate

const getCategorias = async( req: Request, res: Response )=>{
    
    const limite: Number = Number(req.query.limite) || 5;
    const desde: Number = Number(req.query.desde) || 0;
    
    const query = { estado: true };

    const [categorias, total] = await Promise.all([
	Categoria.find(query)
	.skip(Number(desde))
	.limit(Number(limite))
	.populate('usuario','nombre'),
	Categoria.countDocuments(query)
    ]);   
    res.json({
	categorias,
	total
    })

};
// Obtener categoria - populate

const getCategoria = async ( req: Request, res: Response )=>{
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json({
	categoria
   })
};

// Actualizar categoría

const putCategoria = async(req:Request, res: Response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.body.usuarioAutorizado;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json({
	categoria
    })
}

// Borrar caregoría - estado:false
const deleteCategoria = async (req:Request, res: Response) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(
	categoria
    )
}

const postCategoria = async(req:Request<{},{},ReqBody,{}>,
			    res: Response) => {


    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre}) as ICategoria;
    
    if(categoriaDB){
	return res.status(400).json({
	    msg: `La categoría ${categoriaDB.nombre}, ya existe`
	})
    }
    const data ={
	nombre,	
	usuario: req.body.usuarioAutorizado._id
    }

    const categoria = await Categoria.create(data);
    
    res.status(201).json({
	categoria
    })
};

export {
    postCategoria,
    getCategorias,
    getCategoria,
    putCategoria,
    deleteCategoria
}
