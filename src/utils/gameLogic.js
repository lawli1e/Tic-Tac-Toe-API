const { User, Game } = require('../models');
const { Op } = require('sequelize');

const checkWinner = (boardState) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] !== '-' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
};

const updateStats = async (game) => {
  if (game.status === 'completed') {
    const winner = await User.findByPk(game.winner_id);
    const loser = await User.findByPk(
      game.winner_id === game.player1_id ? game.player2_id : game.player1_id
    );
    await winner.increment('wins');
    await loser.increment('losses');
  } else if (game.status === 'draw') {
    await User.increment('draws', { 
      where: { 
        id: [game.player1_id, game.player2_id] 
      }
    });
  }
};

module.exports = { checkWinner, updateStats };