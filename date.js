var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

module.exports = {
    incrementDateStats: function (dailyCounts, weekdayCounts, payload) {
        var date = new Date(payload.timestamp * 1000);
        var dateString = date.toLocaleDateString();
        var dayOfWeek = days[date.getDay()];
        if (!dailyCounts.hasOwnProperty(dateString)) {
            dailyCounts[dateString] = {};
        }
        if (!weekdayCounts.hasOwnProperty(dayOfWeek)) {
            weekdayCounts[dayOfWeek] = {};
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
    },
    getDailyStatsForDay: function (dailyCounts, date) {
        if (dailyCounts.hasOwnProperty(date)) {
            return dailyCounts[date];
        } else {
            return { "error": "unable to fetch stats for invalid date", "date": date };
        }
    }
};
