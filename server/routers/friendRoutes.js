const express = require('express');
const {
    addFriend,
    getFriends,
    removeFriend
} = require('../controllers/friendController');

const router = express.Router();

router.post('/', addFriend);
router.get('/:userId', getFriends);
router.delete('/:userId/:friendId', removeFriend);

module.exports = router;
