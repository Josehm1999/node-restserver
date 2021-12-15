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
exports.deleteProducto = exports.putProducto = exports.getProducto = exports.getProductos = exports.postProducto = void 0;
const models_1 = require("../models");
// Obtener productos - paginado - total - populate
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limite = Number(req.query.limite) || 5;
    const desde = Number(req.query.desde) || 0;
    const query = { estado: true };
    const [productos, total] = yield Promise.all([
        models_1.Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre'),
        models_1.Producto.countDocuments(query)
    ]);
    res.json({
        productos,
        total
    });
});
exports.getProductos = getProductos;
// Obtener producto - populate
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield models_1.Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json({
        producto
    });
});
exports.getProducto = getProducto;
// Actualizar producto
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado, usuario } = _a, data = __rest(_a, ["estado", "usuario"]);
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.body.usuarioAutorizado;
    const producto = yield models_1.Producto.findByIdAndUpdate(id, data, { new: true });
    res.json({
        producto
    });
});
exports.putProducto = putProducto;
// Borrar producto - estado:false
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield models_1.Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(producto);
});
exports.deleteProducto = deleteProducto;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { estado, usuario } = _b, body = __rest(_b, ["estado", "usuario"]);
    const productoDB = yield models_1.Producto.findOne({ nombre: body.nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }
    const data = Object.assign(Object.assign({}, body), { usuario: req.body.usuarioAutorizado._id });
    const producto = yield models_1.Producto.create(data);
    res.status(201).json({
        producto
    });
});
exports.postProducto = postProducto;
//# sourceMappingURL=productos.js.map