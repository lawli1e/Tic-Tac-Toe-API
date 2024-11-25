const router = require('express').Router();
const { getAllUsers, getUserStats } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/list', getAllUsers);
router.get('/stats', getUserStats);

module.exports = router;