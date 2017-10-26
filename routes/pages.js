'use strict';
var express = require('express');
var router = express.Router();

// Path of a page
router.get('/my-path', function (req, res) {
  res.render('pages/my-page', {
    prototypeTitle: 'My Page Prototype',
    config: {}
  });
});

module.exports = router;
