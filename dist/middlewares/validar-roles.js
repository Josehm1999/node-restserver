"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
const esAdminRole = (req, res, next) => {
    if (!req.body.usuarioAutorizado) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol con un token invalido '
        });
    }
    const { rol, nombre } = req.body.usuarioAutorizado;
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.body.usuarioAutorizado) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        if (!roles.includes(req.body.usuarioAutorizado.rol)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-roles.js.map