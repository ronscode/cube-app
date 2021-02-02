var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');


/* GET home page. */
router.get('/', authController.login_get )
router.post('/', authController.login_post)

module.exports = router;
