const { Message } = require('../models/models');

const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: { channel_id: req.params.channelId }
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMessageById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateMessage = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            await message.update(req.body);
            res.status(200).json(message);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            await message.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage
};
