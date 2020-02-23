var utilities = require('./utilities');

module.exports = {
    incrementCategoryStats: function (counters, payload) {
        if (Array.isArray(payload.category)) {
            for (const category of payload.category) {
                utilities.incrementCounter(counters["category_stats"], category, payload.event)
            }
        } else {
            utilities.incrementCounter(counters["category_stats"], payload.category, payload.event)
        }
    }
};
