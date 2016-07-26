var express = require('express');
var router = express.Router();

var delim = require('../util/delim');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

module.exports = router;
