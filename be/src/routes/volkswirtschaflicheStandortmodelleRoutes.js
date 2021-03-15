const express = require('express');
const router = express.Router();

const volkswirtschaftlicheStandortmodelleController = require('../controllers/volkswirtschaftlicheStandortmodelleController');

//list of all users (GET)
router.post('/kostenminimaler_wohnstandorte', volkswirtschaftlicheStandortmodelleController.getKostenminimalerWohnstandort);
router.post('/bodennutzung', volkswirtschaftlicheStandortmodelleController.getBodennutzung);
router.post('/modell_huff', volkswirtschaftlicheStandortmodelleController.getModelHuff);

module.exports = router;

