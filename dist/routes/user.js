"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get API usuarios'
    });
});
router.get('/', (req, res) => {
    res.json({
        msg: 'get API all usuarios'
    });
});
router.post('/', (req, res) => {
    res.json({
        msg: 'post API usuarios'
    });
});
router.put('/:id', (req, res) => {
    res.json({
        msg: 'put API all usuarios'
    });
});
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete API all usuarios'
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map