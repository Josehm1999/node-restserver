import express, {Application} from 'express'
import cors from 'cors'

import usuariosRoutes from '../routes/usuarios'
import authRoutes from '../routes/auth'
import dbConnection from '../database/config'

class Server {

    private app: Application;
    private port: string; 
    private apiPaths = {
	usuarios:'/usuarios',
	auth:'/auth',
	error:'/error'
    };

    constructor(){
	this.app = express();
	this.port = process.env.PORT || '8080';

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
    }

    routes(){
	this.app.use(this.apiPaths.auth, authRoutes)
	this.app.use(this.apiPaths.usuarios, usuariosRoutes);
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


