"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coleccionesPermitidas = exports.esRolValido = exports.existeProductoById = exports.existeCorreo = exports.existeUsuarioById = exports.existeCategoriaById = void 0;
const models_1 = require("../models");
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield models_1.Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const existeCorreo = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    //Verificar si el correo existe
    const existeE = yield models_1.Usuario.findOne({ correo });
    if (existeE) {
        throw new Error('El correo ya está registrado');
    }
});
exports.existeCorreo = existeCorreo;
const existeUsuarioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //Verificar si el usuario existe
    const existeUsuario = yield models_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El id no existe ');
    }
});
exports.existeUsuarioById = existeUsuarioById;
const existeCategoriaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeCategoria = yield models_1.Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoría no existe`);
    }
});
exports.existeCategoriaById = existeCategoriaById;
const existeProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeProducto = yield models_1.Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto no existe`);
    }
});
exports.existeProductoById = existeProductoById;
const coleccionesPermitidas = (coleccion = '', colecciones = []) => __awaiter(void 0, void 0, void 0, function* () {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no esta permitida; Permitidas: ${colecciones}`);
    }
});
exports.coleccionesPermitidas = coleccionesPermitidas;
//# sourceMappingURL=db-validators.js.map