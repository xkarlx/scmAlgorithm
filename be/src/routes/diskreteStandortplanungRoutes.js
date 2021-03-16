const express = require('express');
const router = express.Router();

const diskreteStandortsplanungController = require('../controllers/diskreteStandortsplanungController');

router.post('/dual_adjustment_verfahren',diskreteStandortsplanungController.getDualAdjustmentVerfahren);
router.post('/dual_ascent_verfahren',diskreteStandortsplanungController.getDualAscentVerfahren);
router.post('/greedy_heuristik',diskreteStandortsplanungController.getGreedyHeuristik);
router.post('/interchange_heuristik',diskreteStandortsplanungController.getInterchangeHeuristik);
router.post('/konstruktionsheuristik',diskreteStandortsplanungController.getKonstruktionsHeuristik);


module.exports = router;

