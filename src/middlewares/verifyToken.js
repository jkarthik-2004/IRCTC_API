const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("Authorization Header: ", req.header("Authorization"));
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token is not valid" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
