const router = require('express').Router();
const { createGame, makeMove, getGame, getUserGames } = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.use(auth); // Protect all game routes

router.post('/', createGame);
router.get('/my-games', getUserGames);
router.get('/:gameId', getGame);
router.post('/:gameId/moves', makeMove);

module.exports = router;