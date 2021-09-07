const express = require('express');
const controller = require('../controllers/listServer.controller.js');

const router = express.Router();

router.get('/', controller.get);

router.post('/', controller.post);

router.put('/:name', controller.put);

router.delete('/:name', controller.delete);

router.post('/usage/:name', controller.updateUsage);

module.exports = router;