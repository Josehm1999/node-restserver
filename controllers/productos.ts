import {Request,
	Response} from "express";

import {Producto,
	IProducto,
	IUsuario
	} from "../models";

type ReqBody ={
    usuarioAutorizado: IUsuario,
    nombre: IProducto["nombre"],
    usuario: IProducto["usuario"],
    estado: IProducto["estado"]
}

// Obtener productos - paginado - total - populate

const getProductos = async( req: Request, res: Response )=>{
    
    const limite: Number = Number(req.query.limite) || 5;
    const desde: Number = Number(req.query.desde) || 0;
    
    const query = { estado: true };

    const [productos, total] = await Promise.all([
	Producto.find(query)
	.skip(Number(desde))
	.limit(Number(limite))
	.populate('usuario','nombre')
	.populate('categoria','nombre') ,
	Producto.countDocuments(query)
    ]);   
    res.json({
	productos,
	total
    })

};
// Obtener producto - populate

const getProducto = async ( req: Request, res: Response )=>{
    const {id} = req.params;

    const producto = await Producto.findById(id)
			    .populate('usuario','nombre')
			    .populate('categoria','nombre');
    res.json({
	producto
   })
};

// Actualizar producto

const putProducto = async(req:Request, res: Response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    
    if(data.nombre){
	data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.body.usuarioAutorizado;
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.json({
	producto
    })
}

// Borrar producto - estado:false
const deleteProducto = async (req:Request, res: Response) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(
	producto	
    )
}

const postProducto = async(req:Request<{},{},ReqBody,{}>,
			    res: Response) => {


    const {estado,usuario,...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre}) as IProducto;
    
    if(productoDB){
	return res.status(400).json({
	    msg: `El producto ${productoDB.nombre}, ya existe`
	})
    }
    const data ={
	...body,
	usuario: req.body.usuarioAutorizado._id
    }

    const producto = await Producto.create(data);
    
    res.status(201).json({
	producto
    })
};

export {
    postProducto,
    getProductos,
    getProducto,
    putProducto,
    deleteProducto
}
