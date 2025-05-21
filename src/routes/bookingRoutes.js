const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/bookSeat", verifyToken, bookingController.bookSeat);
router.get("/getBooking", verifyToken, bookingController.getBookingDetails);

module.exports = router;
