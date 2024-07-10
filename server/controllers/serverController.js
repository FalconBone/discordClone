const { Server } = require('../models/models');

const createServer = async (req, res) => {
    try {
        const server = await Server.create(req.body);
        res.status(201).json(server);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getServers = async (req, res) => {
    try {
        const servers = await Server.findAll();
        res.status(200).json(servers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getServerById = async (req, res) => {
    try {
        const server = await Server.findByPk(req.params.id);
        if (server) {
            res.status(200).json(server);
        } else {
            res.status(404).json({ error: 'Server not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateServer = async (req, res) => {
    try {
        const server = await Server.findByPk(req.params.id);
        if (server) {
            await server.update(req.body);
            res.status(200).json(server);
        } else {
            res.status(404).json({ error: 'Server not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteServer = async (req, res) => {
    try {
        const server = await Server.findByPk(req.params.id);
        if (server) {
            await server.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Server not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer
};
