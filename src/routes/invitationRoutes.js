const router = require('express').Router();
const { createInvitation, getInvitations, acceptInvitation } = require('../controllers/invitationController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', createInvitation);
router.get('/', getInvitations);
router.post('/:id/accept', acceptInvitation);

module.exports = router;