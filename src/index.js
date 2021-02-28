module.exports = function check(str, config) {
    if (!isCorrect(str, config)) return false;
    
    str = str.split("");
    let openBrackets = getBracketMap(config);
    let openCount = 0;

    for (let i = 0; i < str.length; i++) {
        for (let k = i + 1; k < str.length; k++) {
            if (str[i] === str[k] && openBrackets[str[i]] !== str[i])
                openCount++;

            if (str[k] === openBrackets[str[i]]) {
                if (openCount === 0) {
                    if (!isCorrect(str.join("").substring(i + 1, k), config)) return false;
                    str.splice(i, 1);
                    str.splice(k - 1, 1);
                    i--;
                    openCount = 0;
                    break;
                } else {
                    openCount--;
                }
            }
        }

        if (openCount != 0) return false;
    }

    return str.length === 0;
};

function isCorrect(str, config) {
    let countOpen = 0;
    let countClose = 0;

    for (let i = 0; i < config.length; i++) {
        for (let k = 0; k < str.length; k++) {
            if (str[k] === config[i][0]) countOpen++;
            if (str[k] === config[i][1]) countClose++;
        }

        if (config[i][0] != config[i][1] && countOpen != countClose) return false;

        if (config[i][0] == config[i][1] && countOpen % 2 != 0) return false;

        countOpen = 0;
        countClose = 0;
    }

    return true;
}

function getBracketMap(config) {
    let res = {};
    for (let i = 0; i < config.length; i++) {
        res[config[i][0]] = config[i][1];
    }

    return res;
}
