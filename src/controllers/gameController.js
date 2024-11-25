const { Game, Move, User } = require('../models');
const { checkWinner } = require('../utils/gameLogic');
const { updateStats } = require('../utils/gameLogic');
const createGame = async (req, res) => {
  try {
    const { player2_id } = req.body;
    const game = await Game.create({
      player1_id: req.user.id,
      player2_id,
      current_turn_id: player2_id // ผู้ถูกท้าเริ่มก่อน
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const makeMove = async (req, res) => {
  try {
    const { position } = req.body;
    const { gameId } = req.params;
    const game = await Game.findByPk(gameId);

    if (!game || game.status !== 'in_progress') {
      return res.status(400).json({ message: 'Invalid game' });
    }

    if (game.current_turn_id !== req.user.id) {
      return res.status(400).json({ message: 'Not your turn' });
    }

    // Check if position is valid and empty
    if (position < 0 || position > 8 || game.board_state[position] !== '-') {
      return res.status(400).json({ message: 'Invalid move' });
    }

    // Update board state
    const newBoardState = game.board_state.split('');
    newBoardState[position] = req.user.id === game.player1_id ? 'X' : 'O';
    game.board_state = newBoardState.join('');

    // Create move record
    await Move.create({
      game_id: gameId,
      player_id: req.user.id,
      position
    });

    // Switch turns
    game.current_turn_id = game.current_turn_id === game.player1_id 
      ? game.player2_id 
      : game.player1_id;

    // Check for win or draw
    const winner = checkWinner(game.board_state);
    if (winner) {
      game.status = 'completed';
      game.winner_id = winner === 'X' ? game.player1_id : game.player2_id;
      await updateStats(game);
    } else if (!game.board_state.includes('-')) {
      game.status = 'draw';
      await updateStats(game);
    }

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.gameId, {
      include: [
        { model: User, as: 'player1' },
        { model: User, as: 'player2' },
        { model: User, as: 'winner' }
      ]
    });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserGames = async (req, res) => {
  try {
    const games = await Game.findAll({
      where: {
        [Op.or]: [
          { player1_id: req.user.id },
          { player2_id: req.user.id }
        ]
      },
      include: [
        { model: User, as: 'player1' },
        { model: User, as: 'player2' },
        { model: User, as: 'winner' }
      ]
    });
    res.json(games);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createGame,
  makeMove,
  getGame,
  getUserGames
};