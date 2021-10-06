const express = require('express');
const controller = require('../controllers/listServer.controller.js');

const router = express.Router();

router.get('/', controller.get);

router.post('/', controller.post);

router.put('/:name/:device', controller.put);

router.delete('/:name/:device', controller.delete);

router.post('/usage/:name/:device', controller.updateUsage);

module.exports = router;