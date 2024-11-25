const sequelize = require('../config/database');
const { User, Game, Move, Invitation } = require('../models');

async function migrate() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
}

migrate();