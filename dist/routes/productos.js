"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const db_validators_1 = require("../helpers/db-validators");
const productos_1 = require("../controllers/productos");
const router = (0, express_1.Router)();
/**
 * {{url}}/categorias
 * */
// Obtener todos los productos - publico
router.get('/', productos_1.getProductos);
// Obtener un producto - publico
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'El producto no existe').custom(db_validators_1.existeProductoById),
    middlewares_1.validarCampos
], productos_1.getProducto);
// Crear un producto - privado - solo usuarios con token valido
router.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('categoria', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('categoria').custom(db_validators_1.existeCategoriaById),
    middlewares_1.validarCampos
], productos_1.postProducto);
// Actualizar un producto - privado - solo usuarios con token valido
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'El producto no existe').custom(db_validators_1.existeProductoById),
    middlewares_1.validarCampos
], productos_1.putProducto);
// Borrar un producto - privado - solo Admin
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'El producto no existe').custom(db_validators_1.existeProductoById),
    middlewares_1.esAdminRole,
    middlewares_1.validarCampos
], productos_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map