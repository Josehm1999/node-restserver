"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const db_validators_1 = require("../helpers/db-validators");
const categorias_1 = require("../controllers/categorias");
const router = (0, express_1.Router)();
/**
 * {{url}}/categorias
 * */
// Obtener todas las categorias - publico
router.get('/', categorias_1.getCategorias);
// Obtener una categoria - publico
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'La categoría no existe').custom(db_validators_1.existeCategoriaById),
    middlewares_1.validarCampos
], categorias_1.getCategoria);
// Crear una categoria - privado - solo usuarios con token valido
router.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    middlewares_1.validarCampos
], categorias_1.postCategoria);
// Actualizar una categoria - privado - solo usuarios con token valido
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'La categoría no existe').custom(db_validators_1.existeCategoriaById),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    middlewares_1.validarCampos
], categorias_1.putCategoria);
// Borrar una categoria - privado - solo Admin
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'La categoría no existe').custom(db_validators_1.existeCategoriaById),
    middlewares_1.esAdminRole,
    middlewares_1.validarCampos
], categorias_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categorias.js.map