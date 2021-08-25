const express = require('express');
const controller = require('../controllers/modelRun.controller');

const router = express.Router();

router.get('/all', controller.getAll);

router.get('/:server', controller.get);

router.post('/', controller.post);

router.put('/:name', controller.put);

router.delete('/:name', controller.delete);

module.exports = router;