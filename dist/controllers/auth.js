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
exports.googleSignIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generarJWT_1 = require("../helpers/generarJWT");
const google_verify_1 = require("../helpers/google-verify");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        // Verificar si el usuario existe
        const usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }
        // Verificar si el usuario está activo
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // Generar el JWT
        const jwt = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            jwt
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salió mal'
        });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = yield (0, google_verify_1.googleVerify)(id_token);
        let usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: "IdontKnowWhyImStillAwake",
                img,
                rol: "USER",
                google: true
            };
            usuario = yield usuario_1.default.create(data);
            console.log(usuario);
        }
        else {
            yield usuario.updateOne({ google: true });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }
        // Generar el JWT	
        const jwt = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            jwt
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'El token no se pudo verificar',
        });
    }
});
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=auth.js.map