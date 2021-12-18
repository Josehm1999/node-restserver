"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validarFiles = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No se subieron archivos.'
        });
    }
    next();
};
exports.default = validarFiles;
//# sourceMappingURL=validar-files.js.map