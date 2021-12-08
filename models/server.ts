import express, {Application} from 'express'
import cors from 'cors'
import usuariosRoutes from '../routes/usuarios'
class Server {

    private app: Application;
    private port: string; 
    private apiPaths = {
    usuarios:'/usuarios'
    };

    constructor(){
	this.app = express();
	this.port = process.env.PORT || '8080';
	this.middlewares();
	this.routes();
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
	this.app.use(this.apiPaths.usuarios, usuariosRoutes);
    };

    listen(){
	this.app.listen( this.port, () => {
	    console.log('Servidor corriendo en puerto!!!! ' + this.port);
	} )
    };
}

export default Server;


