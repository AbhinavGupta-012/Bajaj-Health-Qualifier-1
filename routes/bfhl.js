const express = require('express');
const router = express.Router();

const handleReq = require("../controller/bfhlController");

router.post('/', handleReq);

module.exports = router;