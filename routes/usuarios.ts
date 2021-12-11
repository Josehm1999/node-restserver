import { Router } from "express";
import { check } from "express-validator";


import {validarCampos} from "../middlewares/validar-campos";
import { esRolValido, existeCorreo, existeUsuarioById } from "../helpers/db-validators";

import {
    deleteUsuario,
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario} from "../controllers/usuarios";

const router = Router();

router.get('/:id',getUsuario);
router.get('/', getUsuarios);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeCorreo),
    // check('rol', 'No es un rol válido').isIn(['ADMIN', 'USER']),   
    check('rol').custom( esRolValido ),
    validarCampos
], postUsuario);

router.put('/:id',[
    check('id', 'No es un ID  válido').isMongoId(),
    check('id','El usuario no existe').custom(existeUsuarioById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('rol').custom( esRolValido ),
    validarCampos
],putUsuario);

router.delete('/:id',[
    check('id', 'No es un ID  válido').isMongoId(),
    check('id','El usuario no existe').custom(existeUsuarioById),
    validarCampos
], deleteUsuario);


export default router;
