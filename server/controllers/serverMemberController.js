const { ServerMember } = require('../models/models');

const addServerMember = async (req, res) => {
    try {
        const member = await ServerMember.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getServerMembers = async (req, res) => {
    try {
        const members = await ServerMember.findAll({
            where: { server_id: req.params.serverId }
        });
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeServerMember = async (req, res) => {
    try {
        const member = await ServerMember.findOne({
            where: { server_id: req.params.serverId, user_id: req.params.userId }
        });
        if (member) {
            await member.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addServerMember,
    getServerMembers,
    removeServerMember
};
