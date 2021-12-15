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
exports.buscar = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];
const buscarUsuarios = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = mongoose_1.Types.ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = yield models_1.Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuario = yield models_1.Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuario
    });
});
const buscarCategorias = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = mongoose_1.Types.ObjectId.isValid(termino);
    if (esMongoId) {
        const categoria = yield models_1.Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const categoria = yield models_1.Categoria.find({
        nombre: regex,
        estado: true
    });
    res.json({
        results: categoria
    });
});
const buscarProductos = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = mongoose_1.Types.ObjectId.isValid(termino);
    if (esMongoId) {
        const producto = yield models_1.Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const producto = yield models_1.Producto.find({
        nombre: regex,
        estado: true
    }).populate('categoria', 'nombre');
    res.json({
        results: producto
    });
});
const buscar = (req, res) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son:${coleccionesPermitidas} `
        });
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'roles':
            res.status(404).json({
                msg: 'Ruta aun no implementada'
            });
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Ruta aun no implementada'
            });
            break;
    }
};
exports.buscar = buscar;
//# sourceMappingURL=buscar.js.map