const express = require('express');
const app = express();

const router = express.Router();

const { InfoController } = require('../../controllers');

const bookingRoutes = require('./booking-routes');

router.use('/bookings', bookingRoutes);

router.get('/info', InfoController.info);

module.exports = router;