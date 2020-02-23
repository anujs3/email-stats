var express = require('express');
var category = require('./category');
var daily = require('./date');
var notifications = require('./notifications');
var utilities = require('./utilities');

const port = 8888;

var app = express();
app.use(express.json());

var totalCounts = {
    "processed": 0,
    "dropped": 0,
    "delivered": 0,
    "bounce": 0,
    "deferred": 0,
    "open": 0,
    "click": 0,
    "unsubscribe": 0,
    "group_unsubscribe": 0,
    "group_resubscribe": 0,
    "spamreport": 0,
};
var categoryCounts = {};
var dailyCounts = {};
var weekdayCounts = {};
var hourlyCounts = {};
var monthlyCounts = {};
var totalEvents = 0;
var alerts = {};

app.post('/', function (req, res) {
    console.log(req.headers);
    var payloads = req.body;
    if (req.headers["user-agent"] === "SendGrid Event API" || req.headers["user-agent"] === "Go-http-client/1.1") {
        for (const payload of payloads) {
            console.log(payload);
            totalEvents++;
            totalCounts[payload.event]++;
            category.incrementCategoryStats(categoryCounts, payload);
            daily.incrementDateStats(dailyCounts, weekdayCounts, hourlyCounts, monthlyCounts, payload);
            notifications.checkAlerts(totalCounts, alerts);
        }
    }
    utilities.sendResponse(res, 200, { "success": "received events" });
});

app.get('/total_stats', function (req, res) {
    utilities.sendResponse(res, 200, totalCounts);
});

app.get('/total_events', function (req, res) {
    utilities.sendResponse(res, 200, { "total": totalEvents });
});

app.get('/total_requests', function (req, res) {
    utilities.sendResponse(res, 200, { "requests": totalCounts["processed"] + totalCounts["dropped"] });
});

app.get('/category_stats', function (req, res) {
    utilities.sendResponse(res, 200, categoryCounts);
});

app.get('/category_stats/:cat', function (req, res) {
    utilities.getStatsForKey(res, categoryCounts, req.params.cat, "category");
});

app.get('/daily_stats', function (req, res) {
    utilities.sendResponse(res, 200, dailyCounts);
});

app.get('/daily_stats/:day', function (req, res) {
    utilities.getStatsForKey(res, dailyCounts, req.params.day, "date");
});

app.get('/weekday_stats', function (req, res) {
    utilities.sendResponse(res, 200, weekdayCounts);
});

app.get('/weekday_stats/:day', function (req, res) {
    utilities.getStatsForKey(res, weekdayCounts, utilities.capitalizeFirstLetter(req.params.day), "weekday");
});

app.get('/hourly_stats', function (req, res) {
    utilities.sendResponse(res, 200, hourlyCounts);
});

app.get('/hourly_stats/:hour', function (req, res) {
    utilities.getStatsForKey(res, hourlyCounts, req.params.hour.toUpperCase(), "hour");
});

app.get('/monthly_stats', function (req, res) {
    utilities.sendResponse(res, 200, monthlyCounts);
});

app.get('/monthly_stats/:month', function (req, res) {
    utilities.getStatsForKey(res, monthlyCounts, utilities.capitalizeFirstLetter(req.params.month), "month");
});

app.get('/clear', function (req, res) {
    for (var key in totalCounts) {
        totalCounts[key] = 0;
    }
    categoryCounts = {};
    dailyCounts = {};
    weekdayCounts = {};
    hourlyCounts = {};
    monthlyCounts = {};
    totalEvents = 0;
    utilities.sendResponse(res, 200, { "success": "counters have been cleared" });
});

app.get('/notifications', function (req, res) {
    utilities.sendResponse(res, 200, alerts);
});

app.post('/create_notification', function (req, res) {
    alerts[req.body.name] = {
        "enabled": true,
        "phone": req.body.phone,
        "event": req.body.event,
        "threshold": req.body.threshold,
    }
    utilities.sendResponse(res, 200, { "success": "created the notification" });
})

app.patch('/enable_notification', function (req, res) {
    if (alerts.hasOwnProperty(req.body.name)) {
        alerts[req.body.name]["enabled"] = true;
        return utilities.sendResponse(res, 200, { "success": "enabled the notification" });
    }
    return utilities.sendResponse(res, 400, { "error": "notification does not exist" });
})

app.delete('/delete_notification', function (req, res) {
    if (alerts.hasOwnProperty(req.body.name)) {
        delete alerts[req.body.name];
        return utilities.sendResponse(res, 200, { "success": "deleted the notification" });
    }
    return utilities.sendResponse(res, 400, { "error": "notification does not exist" });
})

app.listen(port, () => console.log(`listening on port ${port}`));
