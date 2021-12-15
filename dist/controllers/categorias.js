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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.putCategoria = exports.getCategoria = exports.getCategorias = exports.postCategoria = void 0;
const models_1 = require("../models");
// Obtener categorias - paginado - total - populate
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limite = Number(req.query.limite) || 5;
    const desde = Number(req.query.desde) || 0;
    const query = { estado: true };
    const [categorias, total] = yield Promise.all([
        models_1.Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre'),
        models_1.Categoria.countDocuments(query)
    ]);
    res.json({
        categorias,
        total
    });
});
exports.getCategorias = getCategorias;
// Obtener categoria - populate
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield models_1.Categoria.findById(id).populate('usuario', 'nombre');
    res.json({
        categoria
    });
});
exports.getCategoria = getCategoria;
// Actualizar categoría
const putCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado, usuario } = _a, data = __rest(_a, ["estado", "usuario"]);
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.body.usuarioAutorizado;
    const categoria = yield models_1.Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json({
        categoria
    });
});
exports.putCategoria = putCategoria;
// Borrar caregoría - estado:false
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield models_1.Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoria);
});
exports.deleteCategoria = deleteCategoria;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = yield models_1.Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre,
        usuario: req.body.usuarioAutorizado._id
    };
    const categoria = yield models_1.Categoria.create(data);
    res.status(201).json({
        categoria
    });
});
exports.postCategoria = postCategoria;
//# sourceMappingURL=categorias.js.map