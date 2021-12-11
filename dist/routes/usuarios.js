"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/:id', usuarios_1.getUsuario);
router.get('/', usuarios_1.getUsuarios);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.existeCorreo),
    // check('rol', 'No es un rol válido').isIn(['ADMIN', 'USER']),   
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'El usuario no existe').custom(db_validators_1.existeUsuarioById),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID  válido').isMongoId(),
    (0, express_validator_1.check)('id', 'El usuario no existe').custom(db_validators_1.existeUsuarioById),
    validar_campos_1.validarCampos
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map