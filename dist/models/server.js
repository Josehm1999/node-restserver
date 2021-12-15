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
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const auth_1 = __importDefault(require("../routes/auth"));
const categorias_1 = __importDefault(require("../routes/categorias"));
const productos_1 = __importDefault(require("../routes/productos"));
const buscar_1 = __importDefault(require("../routes/buscar"));
const config_1 = __importDefault(require("../database/config"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/usuarios',
            auth: '/auth',
            categorias: '/categorias',
            productos: '/productos',
            buscar: '/buscar',
            error: '/error'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
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
    }
    routes() {
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
        this.app.use(this.apiPaths.categorias, categorias_1.default);
        this.app.use(this.apiPaths.productos, productos_1.default);
        this.app.use(this.apiPaths.buscar, buscar_1.default);
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