var express = require('express');
var router = express.Router();
var tutors = require('../tutors');

/* GET users listing. */
router.get('/scan', function(req, res, next) {
  tutors.scan();
  res.send({
    success: true
  });
});

router.get('/:address/connect', function(req, res, next) {
  tutors.connect(req.params.address, function(err) {
    if (err) {
      return next(err)
    }
    return res.send({success: true})
  });
});

router.get('/:address/feed', function(req, res, next) {
  tutors.feed(req.params.address, function(err) {
    if (err) {
      return next(err)
    }
    return res.send({success: true})
  });
});

module.exports = router;
