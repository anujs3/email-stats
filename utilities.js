module.exports = {
    incrementCounter: function (counts, key, event) {
        initializeCounter(counts, key);
        if (counts[key].hasOwnProperty(event)) {
            counts[key][event]++;
        } else {
            counts[key][event] = 1;
        }
    },
    getStatsForKey: function (res, counts, key, keyType) {
        if (counts.hasOwnProperty(key)) {
            return sendResponseBack(res, 200, counts[key]);
        } else {
            var errorMessage = { "error": "unable to fetch stats for invalid " + keyType };
            errorMessage[keyType] = key;
            return sendResponseBack(res, 400, errorMessage);
        }
    },
    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    sendResponse: sendResponseBack
};

function initializeCounter(counts, key) {
    if (!counts.hasOwnProperty(key)) {
        counts[key] = {};
    }
}

function sendResponseBack(res, code, json) {
    res.status(code).send(JSON.stringify(json));
}
