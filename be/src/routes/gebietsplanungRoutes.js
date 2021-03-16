const express = require('express');
const router = express.Router();

const gebietsplanungController = require('../controllers/gebietsplanungController');

router.post('/kompaktheitsmasse',gebietsplanungController.getKompaktheitsMasse);
router.post('/recursive_partioning_algorithmus',gebietsplanungController.getRecursivePartioningAlgorithmus);



module.exports = router;

