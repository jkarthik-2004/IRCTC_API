const verifyToken = require("./verifyToken");

const verifyAdmin = (req, res, next) => {

    const apiKey = req.header("admin-api-key");

    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: "Invalid or missing API key" });
    }

    verifyToken(req, res, () => {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    });

};

module.exports = verifyAdmin;
