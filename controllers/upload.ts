import path from "path";
import fs from "fs";

import { Response, Request } from "express"
import {FileArray, UploadedFile} from "express-fileupload";
import {v2 as cloudinary} from "cloudinary";

import { subirArchivo } from "../helpers";


const cargarArchivo = async (req:Request, res: Response) =>{
  
try {
    const pathCompleto = await subirArchivo(req.files!, ['txt', 'md'], 'textos');
    res.json({
       pathCompleto
    })
} catch (msg) {
    res.status(400).json({
	msg
    })	
  }
}

const actualizarImagen = async(req:Request, res: Response) =>{
    
    const coleccion = req.params.coleccion;
    const modelo = req.body.modelo;

    // Limpiar imagenes previas
    if(modelo.img){
	// Borrar la imagen del servidor
	const pathImagen = path.join(__dirname, '../../public/uploads/', coleccion, modelo.img);
	if(fs.existsSync(pathImagen)){
	    fs.unlinkSync(pathImagen);
	}
    }

    try {
	modelo.img = await subirArchivo(req.files as FileArray, undefined, coleccion) as string;
	await modelo.save();

	res.json({
	    modelo
	})

    } catch (error) {
	res.status(400).json({error});	
    }
}
const actualizarImagenCloudinary = async(req:Request, res: Response) =>{
    
    const coleccion = req.params.coleccion;
    const modelo = req.body.modelo;

    // Limpiar imagenes previas
    if(modelo.img){
	// Borrar la imagen del servidor
	const nombreArray = modelo.img.split('/');
	const nombre = nombreArray[nombreArray.length - 1];
	const [public_id] = nombre.split('.');
	cloudinary.uploader.destroy(coleccion+'/'+public_id);
    }

    try {
	const { tempFilePath } = req.files!.archivo as UploadedFile; 
	const {secure_url}= await cloudinary.uploader.upload(tempFilePath, {
	    folder: coleccion
	});
	modelo.img = secure_url;
	await modelo.save();

	res.json({
	    modelo
	})

    } catch (error) {
	res.status(400).json({error});	
    }
}

const getImagen = async(req:Request, res: Response) => {
    
    const coleccion = req.params.coleccion;
    const modelo = req.body.modelo;
    
    if(modelo.img){	
	const pathImagen = path.join(__dirname, '../../public/uploads/', coleccion, modelo.img);
	if(fs.existsSync(pathImagen)){
	    res.sendFile(pathImagen);
	}
    }

    const pathImgDefault = path.join(__dirname, '../../public/assets/no-image.jpg');
    res.sendFile(pathImgDefault);

}

export {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    getImagen
}
