const User = require('./user');
const Game = require('./game');
const Move = require('./move');
const Invitation = require('./invitation');

// Game Associations
Game.belongsTo(User, { as: 'player1', foreignKey: 'player1_id' });
Game.belongsTo(User, { as: 'player2', foreignKey: 'player2_id' });
Game.belongsTo(User, { as: 'currentTurn', foreignKey: 'current_turn_id' });
Game.belongsTo(User, { as: 'winner', foreignKey: 'winner_id' });
Game.hasMany(Move, { foreignKey: 'game_id' });

// Move Associations
Move.belongsTo(Game, { foreignKey: 'game_id' });
Move.belongsTo(User, { foreignKey: 'player_id' });

// Invitation Associations
Invitation.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Invitation.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

// User Associations
User.hasMany(Game, { foreignKey: 'player1_id' });
User.hasMany(Game, { foreignKey: 'player2_id' });
User.hasMany(Move, { foreignKey: 'player_id' });
User.hasMany(Invitation, { foreignKey: 'sender_id' });
User.hasMany(Invitation, { foreignKey: 'receiver_id' });

module.exports = {
  User,
  Game,
  Move,
  Invitation
};