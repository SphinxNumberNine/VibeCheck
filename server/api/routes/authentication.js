const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/authentication');

router.post('/create', AuthenticationController.createAccount);
router.post('/authorize', AuthenticationController.getAuthToken);

module.exports = router;