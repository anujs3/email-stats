module.exports = {
    incrementCounter: function (counts, key, event) {
        initializeCounter(counts, key);
        if (counts[key].hasOwnProperty(event)) {
            counts[key][event]++;
        } else {
            counts[key][event] = 1;
        }
    },
    getStatsForKey: function (counts, key, keyType) {
        if (counts.hasOwnProperty(key)) {
            return counts[key];
        } else {
            var errorMessage = { "error": "unable to fetch stats for invalid " + keyType };
            errorMessage[keyType] = key;
            return errorMessage;
        }
    }
}

function initializeCounter(counts, key) {
    if (!counts.hasOwnProperty(key)) {
        counts[key] = {};
    }
}