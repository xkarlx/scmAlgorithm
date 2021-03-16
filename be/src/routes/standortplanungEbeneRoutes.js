const express = require('express');
const router = express.Router();

const standortplanungEbeneController = require('../controllers/standortplanungEbenenController');

router.post('/distanzmessung',standortplanungEbeneController.getDistanzmessung);
router.post('/medianprobleme_ebene_l1',standortplanungEbeneController.get1MedianproblemeL1);
router.post('/medianprobleme_ebene_l22',standortplanungEbeneController.get1MedianproblemeL22);
router.post('/medianprobleme_ebene_l2',standortplanungEbeneController.get1MedianproblemeL2);
router.post('/centerprobleme_ebene_linf',standortplanungEbeneController.get1CenterproblemeL1);
router.post('/centerprobleme_ebene_gewichtet',standortplanungEbeneController.get1CenterproblemeGewichtet);
router.post('/centerprobleme_ebene_l2',standortplanungEbeneController.get1CenterproblemeL2);
module.exports = router;

