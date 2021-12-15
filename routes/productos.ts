import { Router } from "express";
import { check } from "express-validator";

import {
    validarCampos,
    validarJWT,
    esAdminRole
} from "../middlewares";
import { existeProductoById, existeCategoriaById } from "../helpers/db-validators";

import { getProducto, getProductos, postProducto, putProducto, deleteProducto} from "../controllers/productos";

const router = Router();

/**
 * {{url}}/categorias
 * */

// Obtener todos los productos - publico
router.get('/', getProductos);

// Obtener un producto - publico
router.get('/:id',[
    check('id', 'No es un ID  válido').isMongoId(),
    check('id', 'El producto no existe').custom(existeProductoById),
    validarCampos
], getProducto)

// Crear un producto - privado - solo usuarios con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos
], postProducto)

// Actualizar un producto - privado - solo usuarios con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID  válido').isMongoId(),
    check('id', 'El producto no existe').custom(existeProductoById),
    validarCampos
], putProducto)

// Borrar un producto - privado - solo Admin
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID  válido').isMongoId(),
    check('id', 'El producto no existe').custom(existeProductoById),
    esAdminRole,
    validarCampos

], deleteProducto)
export default router;
