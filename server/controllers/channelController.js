const { Channel } = require('../models/models');

const createChannel = async (req, res) => {
    try {
        const channel = await Channel.create(req.body);
        res.status(201).json(channel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getChannels = async (req, res) => {
    try {
        const channels = await Channel.findAll({
            where: { server_id: req.params.serverId }
        });
        res.status(200).json(channels);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getChannelById = async (req, res) => {
    try {
        const channel = await Channel.findByPk(req.params.id);
        if (channel) {
            res.status(200).json(channel);
        } else {
            res.status(404).json({ error: 'Channel not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateChannel = async (req, res) => {
    try {
        const channel = await Channel.findByPk(req.params.id);
        if (channel) {
            await channel.update(req.body);
            res.status(200).json(channel);
        } else {
            res.status(404).json({ error: 'Channel not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteChannel = async (req, res) => {
    try {
        const channel = await Channel.findByPk(req.params.id);
        if (channel) {
            await channel.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Channel not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createChannel,
    getChannels,
    getChannelById,
    updateChannel,
    deleteChannel
};
