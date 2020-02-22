var shared = require('./shared');

module.exports = {
    incrementCategoryStats: function (categoryCounts, payload) {
        if (Array.isArray(payload.category)) {
            for (var i = 0; i < payload.category.length; i++) {
                shared.incrementCounter(categoryCounts, payload.category[i], payload.event)
            }
        } else {
            shared.incrementCounter(categoryCounts, payload.category, payload.event)
        }
    }
};
