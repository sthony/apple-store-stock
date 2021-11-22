const express = require('express');

const router = express.Router();
// controller
const checkStock = require('../../controllers/v1/stock');
// validation
const checkStockValidation = require('../../validations/v1/stock');

/* GET stock page. */
router.get('/', [checkStockValidation.index], checkStock.index);

module.exports = router;
