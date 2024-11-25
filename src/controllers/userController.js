const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: req.user.id } // ไม่รวมตัวเอง
      },
      attributes: ['id', 'username', 'wins', 'losses', 'draws']
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserStats = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'wins', 'losses', 'draws']
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserStats };