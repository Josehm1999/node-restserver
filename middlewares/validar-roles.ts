import { Request, Response, NextFunction } from "express";
    
export const esAdminRole = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.usuarioAutorizado){
	return res.status(500).json({
	    msg: 'Se quiere verificar el rol con un token invalido '
	})
    }

    const { rol, nombre } = req.body.usuarioAutorizado;
    
    if(rol !== 'ADMIN'){
	return res.status(401).json({
	    msg: `${ nombre } no es administrador - No puede hacer esto`
	});
    }
    next();
}

export const tieneRole = (...roles: string[]) => {
    return (req: Request, res:Response, next: NextFunction) => {
	if(!req.body.usuarioAutorizado) {
	    return res.status(500).json({
		msg: 'Se quiere verificar el rol sin validar el token primero'
	    })
	}
	if(!roles.includes(req.body.usuarioAutorizado.rol)){
	    return res.status(401).json({
		msg: `El servicio require uno de estos roles ${ roles }`
	    })
	}
	next();	
    }
}
