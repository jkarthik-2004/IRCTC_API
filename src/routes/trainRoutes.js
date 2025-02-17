const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/add', verifyAdmin, trainController.addTrain);
router.get("/getTrains", trainController.getTrains);

module.exports = router;
