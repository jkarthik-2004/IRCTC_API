const db = require("../models/db");

exports.bookSeat = (req, res) => {
  const { train_id, seats } = req.body;
  const user_id = req.user.id;

  if (!train_id || !seats || seats <= 0) {
    return res.status(400).json({ message: "Invalid train_id or seats" });
  }

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Error starting transaction" });
    }

    db.query(
      "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE",
      [train_id],
      (err, result) => {
        if (err) {
          return db.rollback(() =>
            res.status(500).json({ message: "Error fetching train details" })
          );
        }

        if (result.length === 0) {
          return db.rollback(() =>
            res.status(404).json({ message: "Train not found" })
          );
        }

        const train = result[0];

        if (train.available_seats < seats) {
          return db.rollback(() =>
            res.status(400).json({ message: "Not enough seats available" })
          );
        }

        const newAvailableSeats = train.available_seats - seats;

        db.query(
          "UPDATE trains SET available_seats = ? WHERE id = ?",
          [newAvailableSeats, train_id],
          (err) => {
            if (err) {
              return db.rollback(() =>
                res.status(500).json({ message: "Error updating seats" })
              );
            }

            db.query(
              "INSERT INTO bookings (user_id, train_id, seats, status) VALUES (?, ?, ?, ?)",
              [user_id, train_id, seats, "confirmed"],
              (err, result) => {
                if (err) {
                  return db.rollback(() =>
                    res.status(500).json({ message: "Error creating booking" })
                  );
                }

                db.commit((err) => {
                  if (err) {
                    return db.rollback(() =>
                      res.status(500).json({ message: "Error committing" })
                    );
                  }

                  res.status(200).json({
                    message: "Booking confirmed",
                    bookingId: result.insertId,
                  });
                });
              }
            );
          }
        );
      }
    );
  });
};



exports.getBookingDetails = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM bookings WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching booking details", error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }
      res.json({ bookings: results });
    }
  );
};
