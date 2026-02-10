const gcd = require("../utils/gcd");

module.exports = function lcm(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = (result * arr[i]) / gcd(result, arr[i]);
    }
    return result;
};
