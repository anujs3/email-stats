var shared = require('./shared');

module.exports = {
    incrementCategoryStats: function (categoryCounts, payload) {
        if (Array.isArray(payload.category)) {
            for (const category of payload.category) {
                shared.incrementCounter(categoryCounts, category, payload.event)
            }
        } else {
            shared.incrementCounter(categoryCounts, payload.category, payload.event)
        }
    }
};
