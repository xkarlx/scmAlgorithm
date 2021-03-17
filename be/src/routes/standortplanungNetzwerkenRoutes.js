const express = require('express');
const router = express.Router();

const standortplanungNetzwerkenController = require('../controllers/standortplanungNetzwerkenController');

router.post("/medianprobleme_kontenbeschraenkt",standortplanungNetzwerkenController.getMedianproblemeKnotenbeschraenkt)
router.post("/centerprobleme_kontenbeschraenkt",standortplanungNetzwerkenController.getCenterproblemeKnotenbeschraenkt)
router.post("/distanzmeesung_netzwerke",standortplanungNetzwerkenController.getDistanzmessungNetzwerke)

module.exports = router;

