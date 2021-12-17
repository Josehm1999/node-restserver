"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRoutes = exports.uploadRoutes = exports.productosRoutes = exports.categoriasRoutes = exports.buscarRoutes = exports.authRoutes = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.authRoutes = auth_1.default;
const buscar_1 = __importDefault(require("./buscar"));
exports.buscarRoutes = buscar_1.default;
const categorias_1 = __importDefault(require("./categorias"));
exports.categoriasRoutes = categorias_1.default;
const productos_1 = __importDefault(require("./productos"));
exports.productosRoutes = productos_1.default;
const upload_1 = __importDefault(require("./upload"));
exports.uploadRoutes = upload_1.default;
const usuarios_1 = __importDefault(require("./usuarios"));
exports.usuariosRoutes = usuarios_1.default;
//# sourceMappingURL=index.js.map