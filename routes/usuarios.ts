import { Router } from "express";
import {
    deleteUsuario,
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario} from "../controllers/usuarios";

const router = Router();

router.get('/:id',getUsuario);
router.get('/', getUsuarios);
router.post('/', postUsuario);
router.put('/:id',putUsuario);
router.delete('/:id', deleteUsuario);

export default router;
