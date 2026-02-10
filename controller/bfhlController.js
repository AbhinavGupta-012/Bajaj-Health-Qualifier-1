const fib = require("../services/fibonacci");
const prime = require("../services/prime");
const lcm = require("../services/lcm");
const hcf = require("../services/hcf");

module.exports = async (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length !== 1) {
        return res.status(400).json({
            is_success: false,
            official_email: "abhinav1758.be23@chitkara.edu.in",
            message: "Request body must contain exactly one key"
        });
    }
    const key = Object.keys(data)[0];
    const value = data[key];
    let output;
    switch (key) {
        case "fibonacci":
            output = fib(value);
            break;
        case "prime":
            output = prime(value);
            break;
        case "lcm":
            output = lcm(value);
            break;
        case "hcf":
            output = hcf(value);
            break;
        default:
            return res.status(400).json({
                is_success: false,
                official_email: "abhinav1758.be23@chitkara.edu.in",
                message: "Invalid key"
            });
    }

    return res.status(200).json({
        is_success: true,
        official_email: "abhinav1758.be23@chitkara.edu.in",
        data: JSON.stringify(output)
    });
};
