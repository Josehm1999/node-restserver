"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const upload_1 = require("../controllers/upload");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/', middlewares_1.validarFiles, upload_1.cargarArchivo);
router.put('/:coleccion/:id', [
    middlewares_1.validarFiles,
    (0, express_validator_1.check)('id', 'El id debe ser de mongo').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom(c => helpers_1.dbValidators.coleccionesPermitidas(c, ['usuarios', 'productos'])),
    middlewares_1.coleccionValidator,
    middlewares_1.validarCampos
], upload_1.actualizarImagenCloudinary);
router.get('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id debe ser de mongo').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom(c => helpers_1.dbValidators.coleccionesPermitidas(c, ['usuarios', 'productos'])),
    middlewares_1.coleccionValidator,
    middlewares_1.validarCampos
], upload_1.getImagen);
exports.default = router;
//# sourceMappingURL=upload.js.map