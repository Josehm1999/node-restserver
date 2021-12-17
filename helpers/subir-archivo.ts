import {UploadedFile} from "express-fileupload";
import {v4 as uuidv4} from "uuid";
import path from "path";
import { FileArray } from "express-fileupload";


const subirArchivo = (files: FileArray, extensionesValidas= ['png','jpg','jpeg','gif'], carpeta ='') => {
    
    return new Promise((resolve,reject)=> {

	const archivo = files.archivo as UploadedFile ;
	const nombreCortado = archivo.name.split('.');
	const extension = nombreCortado[nombreCortado.length-1];
  
	if(!extensionesValidas.includes(extension)){
	    return reject(`La extension ${extension} no es valida`)
	}
    
	const nombreTemp: string = uuidv4() +'.'+ extension;
	const uploadPath =path.join( __dirname,'../../public/uploads/',carpeta, nombreTemp);
    
	archivo.mv(uploadPath, function(err: string) {
	    if (err) {
	    reject('Ha ocurrido un erro: ' + err)
	    }
	    resolve(nombreTemp);
	});
    });
}

export default subirArchivo;

