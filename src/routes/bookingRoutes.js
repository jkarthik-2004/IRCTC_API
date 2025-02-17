const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/bookSeat", verifyToken, bookingController.bookSeat);
router.get("/getBooking/:user_id", verifyToken, bookingController.getBookingDetails);

module.exports = router;
