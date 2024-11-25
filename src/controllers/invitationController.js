const { Invitation, Game, User } = require('../models');

const createInvitation = async (req, res) => {
  try {
    const { receiver_id } = req.body;
    const invitation = await Invitation.create({
      sender_id: req.user.id,
      receiver_id
    });
    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.findAll({
      where: { 
        receiver_id: req.user.id,
        status: 'pending'
      },
      include: [{
        model: User,
        as: 'sender'
      }]
    });
    res.json(invitations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const acceptInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findByPk(req.params.id);
    
    if (!invitation || invitation.receiver_id !== req.user.id) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    await invitation.update({ status: 'accepted' });

    const game = await Game.create({
      player1_id: invitation.sender_id,
      player2_id: req.user.id,
      current_turn_id: req.user.id
    });

    res.json({ invitation, game });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createInvitation,
  getInvitations,
  acceptInvitation
};