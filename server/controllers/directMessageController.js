const { DirectMessage } = require('../models/models');

const createDirectMessage = async (req, res) => {
    try {
        const directMessage = await DirectMessage.create(req.body);
        res.status(201).json(directMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getDirectMessages = async (req, res) => {
    try {
        const directMessages = await DirectMessage.findAll({
            where: { 
                sender_id: req.params.userId,
                receiver_id: req.params.friendId
            }
        });
        res.status(200).json(directMessages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getDirectMessageById = async (req, res) => {
    try {
        const directMessage = await DirectMessage.findByPk(req.params.id);
        if (directMessage) {
            res.status(200).json(directMessage);
        } else {
            res.status(404).json({ error: 'Direct Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateDirectMessage = async (req, res) => {
    try {
        const directMessage = await DirectMessage.findByPk(req.params.id);
        if (directMessage) {
            await directMessage.update(req.body);
            res.status(200).json(directMessage);
        } else {
            res.status(404).json({ error: 'Direct Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteDirectMessage = async (req, res) => {
    try {
        const directMessage = await DirectMessage.findByPk(req.params.id);
        if (directMessage) {
            await directMessage.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Direct Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createDirectMessage,
    getDirectMessages,
    getDirectMessageById,
    updateDirectMessage,
    deleteDirectMessage
};
