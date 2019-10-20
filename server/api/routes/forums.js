const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const ForumsController = require('../controllers/forums');

router.get('/getAll', ForumsController.getAll);
router.post('/getEntries', checkAuth, ForumsController.getForumEntries);
router.post('/addComment', checkAuth, ForumsController.addComment);

module.exports = router;