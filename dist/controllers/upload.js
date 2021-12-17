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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagen = exports.actualizarImagenCloudinary = exports.actualizarImagen = exports.cargarArchivo = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const helpers_1 = require("../helpers");
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pathCompleto = yield (0, helpers_1.subirArchivo)(req.files, ['txt', 'md'], 'textos');
        res.json({
            pathCompleto
        });
    }
    catch (msg) {
        res.status(400).json({
            msg
        });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coleccion = req.params.coleccion;
    const modelo = req.body.modelo;
    // Limpiar imagenes previas
    if (modelo.img) {
        // Borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../../public/uploads/', coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    try {
        modelo.img = (yield (0, helpers_1.subirArchivo)(req.files, undefined, coleccion));
        yield modelo.save();
        res.json({
            modelo
        });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.actualizarImagen = actualizarImagen;
const actualizarImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coleccion = req.params.coleccion;
    const modelo = req.body.modelo;
    // Limpiar imagenes previas
    if (modelo.img) {
        // Borrar la imagen del servidor
        const nombreArray = modelo.img.split('/');
        const nombre = nombreArray[nombreArray.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary_1.v2.uploader.destroy(coleccion + '/' + public_id);
    }
    try {
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath, {
            folder: coleccion
        });
        modelo.img = secure_url;
        yield modelo.save();
        res.json({
            modelo
        });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.actualizarImagenCloudinary = actualizarImagenCloudinary;
const getImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coleccion = req.params.coleccion;
    const modelo = req.body.modelo;
    if (modelo.img) {
        const pathImagen = path_1.default.join(__dirname, '../../public/uploads/', coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
        }
    }
    const pathImgDefault = path_1.default.join(__dirname, '../../public/assets/no-image.jpg');
    res.sendFile(pathImgDefault);
});
exports.getImagen = getImagen;
//# sourceMappingURL=upload.js.map