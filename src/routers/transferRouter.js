const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.post('/',transferController.transfer );

module.exports = router;