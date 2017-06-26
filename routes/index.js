var express = require('express');
var router = express.Router();
var tutors = require('../tutors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    status: "on",
    devices: tutors.Devices,
    connections: tutors.Connections
  });
});

module.exports = router;
