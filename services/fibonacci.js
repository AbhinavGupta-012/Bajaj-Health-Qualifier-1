module.exports = function fib(n) {
    if (n <= 0) return [];

    let a = 0, b = 1;
    const result = [];

    for (let i = 0; i < n; i++) {
        result.push(a);
        const sum = a + b;
        a = b;
        b = sum;
    }

    return result;
};
