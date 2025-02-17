const db = require("../models/db");

exports.bookSeat = (req, res) => {
  const { train_id, user_id, seats } = req.body;

  if (!train_id || !user_id || !seats) {
    return res
      .status(400)
      .json({ message: "Train ID, User ID, and Seats are required" });
  }

  db.query(
    "SELECT available_seats FROM trains WHERE id = ?",
    [train_id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching train details", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Train not found" });
      }

      const availableSeats = results[0].available_seats;

      if (seats > availableSeats) {
        return res.status(400).json({ message: "Not enough available seats" });
      }

      const newAvailableSeats = availableSeats - seats;

      db.query(
        "UPDATE trains SET available_seats = ? WHERE id = ?",
        [newAvailableSeats, train_id],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error updating available seats", error: err });
          }

          db.query(
            "INSERT INTO bookings (user_id, train_id, status) VALUES (?, ?, ?)",
            [user_id, train_id, "confirmed"],
            (err) => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "Error booking seat", error: err });
              }

              res.json({ message: "Booking successful" });
            }
          );
        }
      );
    }
  );
};

exports.getBookingDetails = (req, res) => {
  const { user_id } = req.params;
  db.query(
    "SELECT * FROM bookings WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching booking details", error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }
      res.json({ bookings: results });
    }
  );
};
