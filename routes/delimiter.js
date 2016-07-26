var express = require('express');
var router = express.Router();
var delim = require('../util/delim.js');

router.get('/', function(req, res, next) {
  res.json(delim.getKeys());
});
router.get('/:key', function(req, res, next) {
  res.json(delim.getDetails(req.params.key));
});
router.delete('/:key', function(req, res, next) {
  delim.removeKey(req.params.key);
  res.json(delim.getKeys());
})
router.post('/:key', function(req, res, next) {
  delim.addKey(req.params.key);
  res.json(delim.getKeys());
})

module.exports = router;
