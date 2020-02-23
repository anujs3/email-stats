var utilities = require('./utilities');

module.exports = {
    incrementCategoryStats: function (categoryCounts, payload) {
        if (Array.isArray(payload.category)) {
            for (const category of payload.category) {
                utilities.incrementCounter(categoryCounts, category, payload.event)
            }
        } else {
            utilities.incrementCounter(categoryCounts, payload.category, payload.event)
        }
    }
};
