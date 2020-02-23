var express = require('express');
var category = require('./category');
var daily = require('./date');
var notifications = require('./notifications');
var utilities = require('./utilities');

const port = 8888;

var app = express();
app.use(express.json());

var counters = {
    "total_stats": {
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
    },
    "category_stats": {},
    "daily_stats": {},
    "weekday_stats": {},
    "hourly_stats": {},
    "monthly_stats": {},
    "total_events": 0,
}

var alerts = {};

app.post('/', function (req, res) {
    console.log(req.headers);
    var payloads = req.body;
    if (req.headers["user-agent"] === "SendGrid Event API" || req.headers["user-agent"] === "Go-http-client/1.1") {
        for (const payload of payloads) {
            console.log(payload);
            counters["total_events"]++;
            counters["total_stats"][payload.event]++;
            category.incrementCategoryStats(counters, payload);
            daily.incrementDateStats(counters, payload);
            notifications.checkAlerts(counters, alerts);
        }
    }
    utilities.sendResponse(res, 200, { "success": "received events" });
});

app.get('/all', function (req, res) {
    utilities.sendResponse(res, 200, counters);
});

app.get('/total_stats', function (req, res) {
    utilities.sendResponse(res, 200, counters["total_stats"]);
});

app.get('/total_events', function (req, res) {
    utilities.sendResponse(res, 200, { "total": counters["total_events"] });
});

app.get('/total_requests', function (req, res) {
    utilities.sendResponse(res, 200, { "requests": counters["total_stats"]["processed"] + counters["total_stats"]["dropped"] });
});

app.get('/category_stats', function (req, res) {
    utilities.sendResponse(res, 200, counters["category_stats"]);
});

app.get('/category_stats/:cat', function (req, res) {
    utilities.getStatsForKey(res, counters["category_stats"], req.params.cat, "category");
});

app.get('/daily_stats', function (req, res) {
    utilities.sendResponse(res, 200, counters["daily_stats"]);
});

app.get('/daily_stats/:day', function (req, res) {
    utilities.getStatsForKey(res, counters["daily_stats"], req.params.day, "date");
});

app.get('/weekday_stats', function (req, res) {
    utilities.sendResponse(res, 200, counters["weekday_stats"]);
});

app.get('/weekday_stats/:day', function (req, res) {
    utilities.getStatsForKey(res, counters["weekday_stats"], utilities.capitalizeFirstLetter(req.params.day), "weekday");
});

app.get('/hourly_stats', function (req, res) {
    utilities.sendResponse(res, 200, counters["hourly_stats"]);
});

app.get('/hourly_stats/:hour', function (req, res) {
    utilities.getStatsForKey(res, counters["hourly_stats"], req.params.hour.toUpperCase(), "hour");
});

app.get('/monthly_stats', function (req, res) {
    utilities.sendResponse(res, 200, counters["monthly_stats"]);
});

app.get('/monthly_stats/:month', function (req, res) {
    utilities.getStatsForKey(res, counters["monthly_stats"], utilities.capitalizeFirstLetter(req.params.month), "month");
});

app.get('/clear', function (req, res) {
    for (var key in counters["total_stats"]) {
        counters["total_stats"][key] = 0;
    }
    counters["category_stats"] = {};
    counters["daily_stats"] = {};
    counters["weekday_stats"] = {};
    counters["hourly_stats"] = {};
    counters["monthly_stats"] = {};
    counters["total_events"] = 0;
    utilities.sendResponse(res, 200, { "success": "counters have been cleared" });
});

app.get('/notifications', function (req, res) {
    utilities.sendResponse(res, 200, alerts);
});

app.post('/create_notification', function (req, res) {
    if (!counters.hasOwnProperty(req.body.counter)) {
        return utilities.sendResponse(res, 400, { "error": "counter does not exist" });
    }
    if (req.body.threshold < 0) {
        return utilities.sendResponse(res, 400, { "error": "invalid threshold" });
    }

    alerts[req.body.name] = {
        "enabled": true,
        "phone": req.body.phone,
        "event": req.body.event,
        "threshold": req.body.threshold,
        "counter": req.body.counter,
        "key": req.body.key,
    }
    return utilities.sendResponse(res, 200, { "success": "created the notification" });
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
