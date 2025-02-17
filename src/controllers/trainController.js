const db = require("../models/db");

exports.getTrains = (req, res) => {
    const { source, destination } = req.query;
    db.query("SELECT * FROM trains WHERE source = ? AND destination = ?", [source, destination], 
        (err, trains) => {
            if (err) return res.status(500).json({ message: "Error fetching trains" });
            res.json(trains);
        }
    );
};

