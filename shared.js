module.exports = {
    incrementCounter: function (counts, key, event) {
        initializeCounter(counts, key);
        if (counts[key].hasOwnProperty(event)) {
            counts[key][event]++;
        } else {
            counts[key][event] = 1;
        }
    }
}

function initializeCounter(counts, key) {
    if (!counts.hasOwnProperty(key)) {
        counts[key] = {};
    }
}