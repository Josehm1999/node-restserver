"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const archivo = files.archivo;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es valida`);
        }
        const nombreTemp = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname, '../../public/uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject('Ha ocurrido un erro: ' + err);
            }
            resolve(nombreTemp);
        });
    });
};
exports.default = subirArchivo;
//# sourceMappingURL=subir-archivo.js.map