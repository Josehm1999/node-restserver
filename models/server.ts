import express, {Application} from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {v2 as cloudinary} from 'cloudinary'
import {
    usuariosRoutes,
    authRoutes,
    categoriasRoutes, 
    buscarRoutes,
    productosRoutes,
    uploadRoutes
}
from '../routes'

import dbConnection from '../database/config'

class Server {

    private app: Application;
    private port: string; 
    private apiPaths = {
	usuarios:'/usuarios',
	auth:'/auth',
	categorias: '/categorias',
	productos: '/productos',
	buscar: '/buscar',
	uploads: '/uploads',
	error:'/error'
    };

    constructor(){
	this.app = express();
	this.port = `${process.env.PORT}`;

	//Conexión a DB
	this.conexiónDB();
	this.middlewares();
	this.routes();
    }

    async conexiónDB(){
	await dbConnection();
    }

    middlewares(){
	// CORS
	this.app.use( cors());
	// Lectura y Parseo del body
	this.app.use(express.json());
	//Carpeta pública
	this.app.use(express.static('public'));
	//FileUpload - Carga de archivos
	this.app.use(fileUpload({
	    useTempFiles: true,
	    tempFileDir: '/tmp/',
	    createParentPath: true
	}));
	// Cloudinary	
	cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
	});
    }

    routes(){
	this.app.use(this.apiPaths.auth, authRoutes)
	this.app.use(this.apiPaths.usuarios, usuariosRoutes)
	this.app.use(this.apiPaths.categorias, categoriasRoutes)
	this.app.use(this.apiPaths.productos, productosRoutes)
	this.app.use(this.apiPaths.buscar, buscarRoutes)
	this.app.use(this.apiPaths.uploads, uploadRoutes)
	this.app.use(this.apiPaths.error, () =>{
	    throw new Error("Algo ha salido mal");
	})
    };

    listen(){
	this.app.listen( this.port, () => {
	    console.log('Servidor corriendo en puerto!!!! ' + this.port);
	} )
    };
}

export default Server;


