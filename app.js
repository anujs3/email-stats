var express = require('express');
var category = require('./category');
var daily = require('./date');

const port = 8888;

var app = express();
app.use(express.json());

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sendResponse(res, json) {
    res.send(JSON.stringify(json));
}

var totalCounts = {
    "open": 0,
    "click": 0,
    "dropped": 0,
    "group_unsubscribe": 0,
    "group_resubscribe": 0,
    "unsubscribe": 0,
    "processed": 0,
    "delivered": 0,
    "bounce": 0,
    "deferred": 0,
    "spamreport": 0,
};
var categoryCounts = {};
var dailyCounts = {};
var weekdayCounts = {};
var hourlyCounts = {};
var totalEvents = 0;

app.post('/', function (req, res) {
    console.log(req.headers);
    var payloads = req.body;
    if (req.headers["user-agent"] === "SendGrid Event API" || req.headers["user-agent"] === "Go-http-client/1.1") {
        for (var i = 0; i < payloads.length; i++) {
            var payload = payloads[i];
            console.log(payload);
            totalEvents++;
            totalCounts[payload.event]++;
            category.incrementCategoryStats(categoryCounts, payload);
            daily.incrementDateStats(dailyCounts, weekdayCounts, hourlyCounts, payload);
        }
    }
    return res.status(200).send("received events");
});

app.get('/total_stats', function (req, res) {
    sendResponse(res, totalCounts);
});

app.get('/total_events', function (req, res) {
    sendResponse(res, { "total": totalEvents });
});

app.get('/total_requests', function (req, res) {
    sendResponse(res, { "requests": totalCounts["processed"] + totalCounts["dropped"] });
});

app.get('/category_stats', function (req, res) {
    sendResponse(res, categoryCounts);
});

app.get('/category_stats/:cat', function (req, res) {
    sendResponse(res, category.getCategoryStatsForCategory(categoryCounts, req.params.cat));
});

app.get('/daily_stats', function (req, res) {
    sendResponse(res, dailyCounts);
});

app.get('/daily_stats/:day', function (req, res) {
    sendResponse(res, daily.getDailyStatsForDay(dailyCounts, req.params.day));
});

app.get('/weekday_stats', function (req, res) {
    sendResponse(res, weekdayCounts);
});

app.get('/weekday_stats/:day', function (req, res) {
    sendResponse(res, weekdayCounts[capitalizeFirstLetter(req.params.day)]);
});

app.get('/hourly_stats', function (req, res) {
    sendResponse(res, hourlyCounts);
});

app.get('/hourly_stats/:hour', function (req, res) {
    sendResponse(res, hourlyCounts[req.params.hour]);
});

app.get('/clear', function (req, res) {
    for (var key in totalCounts) {
        if (totalCounts.hasOwnProperty(key)) {
            totalCounts[key] = 0;
        }
    }
    categoryCounts = {};
    dailyCounts = {};
    weekdayCounts = {};
    hourlyCounts = {};
    totalEvents = 0;
    res.send("counters have been cleared");
});

app.listen(port, () => console.log(`listening on port ${port}`));
