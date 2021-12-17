import { Router } from "express";
import { check } from "express-validator";

import {validarCampos} from "../middlewares";
import { login, googleSignIn } from "../controllers/auth";

const router = Router();



router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'El ID de Google es necesario').notEmpty(),
    validarCampos
], googleSignIn);

export default router;
