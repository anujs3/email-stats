module.exports = {
    incrementCategoryStats: function (categoryCounts, payload) {
        if (Array.isArray(payload.category)) {
            for (var i = 0; i < payload.category.length; i++) {
                var category = payload.category[i];
                incrementStatsForOneCategory(categoryCounts, category, payload.event)
            }
        } else {
            incrementStatsForOneCategory(categoryCounts, payload.category, payload.event)
        }
    },
    getCategoryStatsForCategory: function (categoryCounts, categoryName) {
        if (categoryCounts.hasOwnProperty(categoryName)) {
            return categoryCounts[categoryName];
        } else {
            return { "error": "unable to fetch stats for invalid category", "category": categoryName };
        }
    }
};

function incrementStatsForOneCategory(categoryCounts, category, event) {
    if (!categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category] = {};
    }
    if (categoryCounts[category].hasOwnProperty(event)) {
        categoryCounts[category][event]++;
    } else {
        categoryCounts[category][event] = 1;
    }
}