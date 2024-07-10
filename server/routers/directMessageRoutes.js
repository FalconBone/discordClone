const express = require('express');
const {
    createDirectMessage,
    getDirectMessages,
    getDirectMessageById,
    updateDirectMessage,
    deleteDirectMessage
} = require('../controllers/directMessageController');

const router = express.Router();

router.post('/', createDirectMessage);
router.get('/:userId/:friendId', getDirectMessages);
router.get('/:id', getDirectMessageById);
router.put('/:id', updateDirectMessage);
router.delete('/:id', deleteDirectMessage);

module.exports = router;
