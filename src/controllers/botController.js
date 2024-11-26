const { Game, Move } = require('../models');
const { getBotMove } = require('../utils/botLogic');
const { checkWinner, updateStats } = require('../utils/gameLogic');

// BOT user ID (สร้างไว้ในฐานข้อมูล)
const BOT_ID = 9999;

const createBotGame = async (req, res) => {
  try {
    // สร้างเกมใหม่กับ bot
    const game = await Game.create({
      player1_id: req.user.id,
      player2_id: BOT_ID,
      current_turn_id: req.user.id, // ผู้เล่นเริ่มก่อน
      board_state: '---------'
    });

    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const makeMoveAgainstBot = async (req, res) => {
  try {
    const { position } = req.body;
    const { gameId } = req.params;
    const game = await Game.findByPk(gameId);

    // ตรวจสอบความถูกต้อง
    if (!game || game.status !== 'in_progress') {
      return res.status(400).json({ message: 'Invalid game' });
    }

    if (game.current_turn_id !== req.user.id) {
      return res.status(400).json({ message: 'Not your turn' });
    }

    // บันทึกการเดินของผู้เล่น
    const newBoardState = game.board_state.split('');
    newBoardState[position] = 'X';
    game.board_state = newBoardState.join('');

    // เช็คผู้ชนะหลังผู้เล่นเดิน
    let winner = checkWinner(game.board_state);
    if (!winner && game.board_state.includes('-')) {
      // Bot's turn
      const botMove = getBotMove(game.board_state);
      newBoardState[botMove] = 'O';
      game.board_state = newBoardState.join('');
      
      // บันทึกการเดินของ bot
      await Move.create({
        game_id: gameId,
        player_id: BOT_ID,
        position: botMove
      });

      // เช็คผู้ชนะหลัง bot เดิน
      winner = checkWinner(game.board_state);
    }

    if (winner) {
      game.status = 'completed';
      game.winner_id = winner === 'X' ? game.player1_id : BOT_ID;
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

module.exports = { createBotGame, makeMoveAgainstBot };