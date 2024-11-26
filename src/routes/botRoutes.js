const router = require('express').Router();
const { createBotGame, makeMoveAgainstBot } = require('../controllers/botController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/games/bot', createBotGame);
router.post('/games/bot/:gameId/moves', makeMoveAgainstBot);

module.exports = router;