const express = require('express');
const { testController } = require('../controllers/testController');

//router object
const router = express.Router();

//routes
// 1 test
router.get('/', testController)

//export
module.exports = router;