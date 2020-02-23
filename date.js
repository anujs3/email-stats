var utilities = require('./utilities');

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var hours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = {
    incrementDateStats: function (dailyCounts, weekdayCounts, hourlyCounts, monthlyCounts, payload) {
        var date = new Date(payload.timestamp * 1000);
        var dateString = date.toLocaleDateString();
        var dayOfWeek = days[date.getDay()];
        var hour = hours[date.getHours()];
        var month = months[date.getMonth()];
        utilities.incrementCounter(dailyCounts, dateString, payload.event);
        utilities.incrementCounter(weekdayCounts, dayOfWeek, payload.event);
        utilities.incrementCounter(hourlyCounts, hour, payload.event);
        utilities.incrementCounter(monthlyCounts, month, payload.event);
    }
};
