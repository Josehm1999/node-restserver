import { Router } from "express";
import { check } from "express-validator";

import {
    validarCampos,
    validarJWT,
    esAdminRole
} from "../middlewares";
import { existeCategoriaById } from "../helpers/db-validators";

import { postCategoria, getCategorias, getCategoria, putCategoria, deleteCategoria } from "../controllers/categorias";

const router = Router();

/**
 * {{url}}/categorias
 * */

// Obtener todas las categorias - publico
router.get('/', getCategorias);

// Obtener una categoria - publico
router.get('/:id',[
    check('id', 'No es un ID  válido').isMongoId(),
    check('id', 'La categoría no existe').custom(existeCategoriaById),
    validarCampos
], getCategoria)

// Crear una categoria - privado - solo usuarios con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], postCategoria)

// Actualizar una categoria - privado - solo usuarios con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID  válido').isMongoId(),
    check('id', 'La categoría no existe').custom(existeCategoriaById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], putCategoria)

// Borrar una categoria - privado - solo Admin
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID  válido').isMongoId(),
    check('id', 'La categoría no existe').custom(existeCategoriaById),
    esAdminRole,
    validarCampos

], deleteCategoria)
export default router;
