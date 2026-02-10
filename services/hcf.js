const gcd = require("../utils/gcd");

module.exports = function hcf(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
};
