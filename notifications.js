var sms = require('./sms');

var client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

module.exports = {
    checkAlerts: function (totalCounts, alerts) {
        for (var name in alerts) {
            var alert = alerts[name];
            if (alert["enabled"] && totalCounts[alert["event"]] == alert["threshold"]) {
                sms.sendTextMessage(client, alert["phone"], name);
                alert["enabled"] = false;
            }
        }
    }
};
