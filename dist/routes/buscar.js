"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscar_1 = require("../controllers/buscar");
const router = (0, express_1.Router)();
router.get('/:coleccion/:termino', buscar_1.buscar);
exports.default = router;
//# sourceMappingURL=buscar.js.map