import { Router } from "express";
import { check } from "express-validator";

import {
    validarCampos,
    validarJWT,
    tieneRole
} from '../middlewares'

import { esRolValido, existeCorreo, existeUsuarioById } from "../helpers/db-validators";

import { 
    deleteUsuario,
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario} from "../controllers/usuarios";

const router = Router();


router.get('/', getUsuarios);

router.get('/:id',[
    check('id', 'No es un ID  válido').isMongoId(),
    check('id','El usuario no existe').custom(existeUsuarioById),
    validarCampos
],getUsuario);

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
    validarJWT,
    check('id', 'No es un ID  válido').isMongoId(),
    check('id','El usuario no existe').custom(existeUsuarioById),
    check('rol').custom( esRolValido ),
    validarCampos
],putUsuario); 

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN','VENTAS'),
    check('id', 'No es un ID  válido').isMongoId(),
    check('id','El usuario no existe').custom(existeUsuarioById),
    validarCampos
], deleteUsuario);

export default router;
