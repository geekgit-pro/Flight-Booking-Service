const cron = require('node-cron');

//const bookingService = require('../../services/booking-service'); this is my version its correct too
const { BookingService } = require('../../services');


function scheduleCrons() {
    cron.schedule('*/30 * * * *', async ()=> {
        //console.log("inside scheduleCrons", BookingService);
        //console.log('running a task every minute');
        await BookingService.cancelOldBookings();
        
    });

}


module.exports = scheduleCrons;