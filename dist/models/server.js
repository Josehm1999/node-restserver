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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cloudinary_1 = require("cloudinary");
const routes_1 = require("../routes");
const config_1 = __importDefault(require("../database/config"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/usuarios',
            auth: '/auth',
            categorias: '/categorias',
            productos: '/productos',
            buscar: '/buscar',
            uploads: '/uploads',
            error: '/error'
        };
        this.app = (0, express_1.default)();
        this.port = `${process.env.PORT}`;
        //Conexión a DB
        this.conexiónDB();
        this.middlewares();
        this.routes();
    }
    conexiónDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura y Parseo del body
        this.app.use(express_1.default.json());
        //Carpeta pública
        this.app.use(express_1.default.static('public'));
        //FileUpload - Carga de archivos
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
        // Cloudinary	
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }
    routes() {
        this.app.use(this.apiPaths.auth, routes_1.authRoutes);
        this.app.use(this.apiPaths.usuarios, routes_1.usuariosRoutes);
        this.app.use(this.apiPaths.categorias, routes_1.categoriasRoutes);
        this.app.use(this.apiPaths.productos, routes_1.productosRoutes);
        this.app.use(this.apiPaths.buscar, routes_1.buscarRoutes);
        this.app.use(this.apiPaths.uploads, routes_1.uploadRoutes);
        this.app.use(this.apiPaths.error, () => {
            throw new Error("Algo ha salido mal");
        });
    }
    ;
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto!!!! ' + this.port);
        });
    }
    ;
}
exports.default = Server;
//# sourceMappingURL=server.js.map