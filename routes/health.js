const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        is_success: true,
        official_mail: "abhinav1758.be23@chitkara.edu.in"
    });
});

module.exports = router;