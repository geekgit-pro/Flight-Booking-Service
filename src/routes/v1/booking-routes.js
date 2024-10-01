const express = require('express');
const router = express.Router();
const { BookingController } = require('../../controllers');
const { validateMakePaymentsRequest } = require('../../middlewares/payments-middlewares');

router.post(
    '/',
    BookingController.createBooking
);

router.post(
    '/payments',
    validateMakePaymentsRequest,
    BookingController.makePayment
);

module.exports = router;