const db = require("../models/db");


exports.getTrains = (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ message: "Source and destination are required" });
    }

    const query = `
        SELECT id, name, source, destination, total_seats, available_seats
        FROM trains
        WHERE source = ? AND destination = ?
    `;

    db.query(query, [source, destination], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching trains", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No trains found between this route" });
        }

        const trainsWithStatus = results.map(train => ({
            ...train,
            availabilityStatus: train.available_seats > 0 ? "Available" : "Full"
        }));

        res.json({ trains: trainsWithStatus });
    });
};


exports.addTrain = (req, res) => {
  const { name, source, destination, total_seats, available_seats } = req.body;

  if (!name || !source || !destination || total_seats == null || available_seats == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (total_seats <= 0 || available_seats < 0 || available_seats > total_seats) {
    return res.status(400).json({ message: "Invalid seat values" });
  }

  db.query(
    "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)",
    [name, source, destination, total_seats, available_seats],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error adding train", error: err });
      }
      res.status(201).json({ message: "Train added successfully", trainId: result.insertId });
    }
  );
};

