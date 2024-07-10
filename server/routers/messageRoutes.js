const express = require('express');
const {
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage
} = require('../controllers/messageController');

const router = express.Router();

router.post('/', createMessage);
router.get('/:channelId', getMessages);
router.get('/:id', getMessageById);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;