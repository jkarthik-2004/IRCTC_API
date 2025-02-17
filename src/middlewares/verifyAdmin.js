const jwt = require('jsonwebtoken');
const verifyToken = require("./verifyToken");

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can add trains.' });
        }
        next();
    });
};

module.exports = verifyAdmin;
