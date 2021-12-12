import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";
import { login } from "../controllers/auth";

const router = Router();



router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], login);


export default router;
