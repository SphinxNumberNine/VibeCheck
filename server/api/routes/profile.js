const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const ProfileController = require('../controllers/profile');

router.get('/getEntires', checkAuth, ProfileController.getProfileEntries);
router.post('/addEntry', checkAuth, ProfileController.addEntry);
router.post('/addToForum', checkAuth, ProfileController.addEntryToForum);
router.post('/deleteEntry', checkAuth, ProfileController.deleteEntry);

module.exports = router;