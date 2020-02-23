var sms = require('./sms');

var client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

module.exports = {
    checkAlerts: function (counters, alerts) {
        for (var name in alerts) {
            var alert = alerts[name];
            var counterName = alert["counter"];
            var counter = counters[counterName];
            if (alert["enabled"]) {
                if (counterName == "total_stats") {
                    if (counter[alert["event"]] == alert["threshold"]) {
                        sms.sendTextMessage(client, alert["phone"], name);
                        alert["enabled"] = false;
                    }
                } else {
                    if (counter.hasOwnProperty(alert["key"])) {
                        if (counter[alert["key"]].hasOwnProperty(alert["event"])) {
                            if (counter[alert["key"]][alert["event"]] == alert["threshold"]) {
                                sms.sendTextMessage(client, alert["phone"], name);
                                alert["enabled"] = false;
                            }
                        }
                    }
                }
            }
        }
    }
};
