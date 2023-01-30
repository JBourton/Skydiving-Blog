const express = require('express');
const router = express.Router();
const controller = require('../render_form.js');

router.get('/', controller.form);

// router.post('/', controller.formprocess);

/*
const controller = require('../containers/form');
router.get('/', controller.form);
router.post('/', controller.formprocess);
*/ 

module.exports = router;