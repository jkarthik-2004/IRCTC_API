const db = require("../models/db");

exports.getTrains = (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ message: "Source and destination are required" });
    }

    const query = `
        SELECT * FROM trains
        WHERE source = ? AND destination = ?`;

    db.query(query, [source, destination], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching trains", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No trains found between this route" });
        }

        res.json({ trains: results });
    });
};

exports.addTrain = (req, res) => {
    const { name, source, destination, total_seats, available_seats } = req.body;
    db.query("INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)", 
        [name, source, destination, total_seats, available_seats],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Error adding train" });
            res.status(201).json({ message: "Train added successfully", trainId: result.insertId });
        }
    );
};

