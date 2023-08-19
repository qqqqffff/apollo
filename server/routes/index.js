const express = require('express');
const router = express.Router();
const proxy = require('../proxy');
const attachBearerToken = require('../token/attachBearerToken');

router.use(attachBearerToken('service', 'service'));

router.use('/service', proxy('service'));
router.use('/user', require('./user'));

module.exports = router;