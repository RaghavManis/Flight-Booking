function convertToEpoch(dateString) {
    // Split the date and time components
    let [datePart, timePart] = dateString.split(' ');

    // Now the date part is in 'YYYY-MM-DD' format, so no need to split further
    // Construct a new Date object with the provided components
    let dateObject = new Date(`${datePart}T${timePart}`);

    // Convert to epoch time
    return dateObject.getTime();
}

function compareTime(departure, arrival) {
    // Convert both departure and arrival to epoch time
    departure = convertToEpoch(departure);
    arrival = convertToEpoch(arrival);

    // Log the epoch times
    console.log("Departure (epoch): " + departure);
    console.log("Arrival (epoch): " + arrival);

    // Compare the two epoch times
    // console.log(arrival < departure) ;
    // console.log(arrival > departure) ;
    return arrival > departure;
}

module.exports = {
    compareTime,
};
