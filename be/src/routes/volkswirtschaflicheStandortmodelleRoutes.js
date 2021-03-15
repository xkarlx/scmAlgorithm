const express = require('express');
const router = express.Router();

const volkswirtschaftlicheStandortmodelleController = require('../controllers/volkswirtschaftlicheStandortmodelleController');

//list of all users (GET)
router.post('/kostenminimaler_wohnstandorte', volkswirtschaftlicheStandortmodelleController.getKostenminimalerWohnstandort);
router.post('/bodennutzung', volkswirtschaftlicheStandortmodelleController.getBodennutzung);
router.post('/modell_huff', volkswirtschaftlicheStandortmodelleController.getModelHuff);
router.post('/leader_follower_modelle', volkswirtschaftlicheStandortmodelleController.getLeaderFollowerModelle);

module.exports = router;

