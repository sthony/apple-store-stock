const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/healthcheck', function(req, res, next) {
  return res.json({
    status: 'ok',
  });
});

module.exports = router;