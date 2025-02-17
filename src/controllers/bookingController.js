exports.bookSeat = (req, res) => {
    const { user_id } = req.user;
    const { train_id } = req.body;

    db.query("SELECT available_seats FROM trains WHERE id = ?", [train_id], (err, result) => {
        if (err || result.length === 0) return res.status(400).json({ message: "Train not found" });

        if (result[0].available_seats > 0) {
            db.query("UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?", [train_id], (err) => {
                if (err) return res.status(500).json({ message: "Booking failed" });

                db.query("INSERT INTO bookings (user_id, train_id) VALUES (?, ?)", [user_id, train_id], (err) => {
                    if (err) return res.status(500).json({ message: "Booking failed" });
                    res.json({ message: "Seat booked successfully" });
                });
            });
        } else {
            res.status(400).json({ message: "No seats available" });
        }
    });
};
