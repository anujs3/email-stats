var shared = require('./shared');

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var hours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"]

module.exports = {
    incrementDateStats: function (dailyCounts, weekdayCounts, hourlyCounts, payload) {
        var date = new Date(payload.timestamp * 1000);
        var dateString = date.toLocaleDateString();
        var dayOfWeek = days[date.getDay()];
        var hour = hours[date.getHours()];
        shared.incrementCounter(dailyCounts, dateString, payload.event);
        shared.incrementCounter(weekdayCounts, dayOfWeek, payload.event);
        shared.incrementCounter(hourlyCounts, hour, payload.event);
    }
};
