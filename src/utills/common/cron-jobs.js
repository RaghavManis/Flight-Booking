const cron = require("node-cron");
const { BookingService } = require("../../services");

function scheduleCrons() {
  cron.schedule('*/30 * * * *', async () => {  // spaces must be as it is 
    await BookingService.cancelOldBookings();
  });
}

module.exports = scheduleCrons;
    