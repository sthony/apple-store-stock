const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/healthcheck', function(req, res, next) {
  return res.status(200).json({
    status: 'ok',
  });
});

// router.get('*', (req, res) => {
//   return res.status(404).json({
//     message: 'wrong route',
//   });
// });

module.exports = router;