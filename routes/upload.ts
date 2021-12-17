import { Router } from "express";
import {check} from "express-validator";

import {
	cargarArchivo,
	actualizarImagenCloudinary,
	getImagen } from "../controllers/upload";
import { dbValidators } from "../helpers";
import {
    validarCampos,
    validarFiles,
    coleccionValidator
} from "../middlewares";

const router = Router();

router.post('/', validarFiles, cargarArchivo)

router.put('/:coleccion/:id', [
    validarFiles,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => dbValidators.coleccionesPermitidas(c, ['usuarios', 'productos'])),
    coleccionValidator,
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => dbValidators.coleccionesPermitidas(c, ['usuarios', 'productos'])),
    coleccionValidator,
    validarCampos
], getImagen)
export default router;
