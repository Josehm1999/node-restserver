"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coleccionValidator = exports.validarFiles = exports.esAdminRole = exports.tieneRole = exports.validarJWT = exports.validarCampos = void 0;
const validar_campos_1 = __importDefault(require("./validar-campos"));
exports.validarCampos = validar_campos_1.default;
const validar_jwt_1 = __importDefault(require("./validar-jwt"));
exports.validarJWT = validar_jwt_1.default;
const validar_roles_1 = require("./validar-roles");
Object.defineProperty(exports, "tieneRole", { enumerable: true, get: function () { return validar_roles_1.tieneRole; } });
Object.defineProperty(exports, "esAdminRole", { enumerable: true, get: function () { return validar_roles_1.esAdminRole; } });
const validar_files_1 = __importDefault(require("./validar-files"));
exports.validarFiles = validar_files_1.default;
const coleccion_validator_1 = __importDefault(require("./coleccion-validator"));
exports.coleccionValidator = coleccion_validator_1.default;
//# sourceMappingURL=index.js.map