var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', authController.signup_get)

router.post('/', authController.signup_post)

module.exports = router;
