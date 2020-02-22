var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var hours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"]

module.exports = {
    incrementDateStats: function (dailyCounts, weekdayCounts, hourlyCounts, payload) {
        var date = new Date(payload.timestamp * 1000);
        var dateString = date.toLocaleDateString();
        var dayOfWeek = days[date.getDay()];
        var hour = hours[date.getHours()];
        if (!dailyCounts.hasOwnProperty(dateString)) {
            dailyCounts[dateString] = {};
        }
        if (!weekdayCounts.hasOwnProperty(dayOfWeek)) {
            weekdayCounts[dayOfWeek] = {};
        }
        if (!hourlyCounts.hasOwnProperty(hour)) {
            hourlyCounts[hour] = {};
        }
        if (dailyCounts[dateString].hasOwnProperty(payload.event)) {
            dailyCounts[dateString][payload.event]++;
        } else {
            dailyCounts[dateString][payload.event] = 1;
        }
        if (weekdayCounts[dayOfWeek].hasOwnProperty(payload.event)) {
            weekdayCounts[dayOfWeek][payload.event]++;
        } else {
            weekdayCounts[dayOfWeek][payload.event] = 1;
        }
        if (hourlyCounts[hour].hasOwnProperty(payload.event)) {
            hourlyCounts[hour][payload.event]++;
        } else {
            hourlyCounts[hour][payload.event] = 1;
        }
    },
    getDailyStatsForDay: function (dailyCounts, date) {
        if (dailyCounts.hasOwnProperty(date)) {
            return dailyCounts[date];
        } else {
            return { "error": "unable to fetch stats for invalid date", "date": date };
        }
    }
};
