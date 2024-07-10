const { Friend } = require('../models/models');

const addFriend = async (req, res) => {
    try {
        const friend = await Friend.create(req.body);
        res.status(201).json(friend);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFriends = async (req, res) => {
    try {
        const friends = await Friend.findAll({
            where: { user_id: req.params.userId }
        });
        res.status(200).json(friends);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeFriend = async (req, res) => {
    try {
        const friend = await Friend.findOne({
            where: { user_id: req.params.userId, friend_id: req.params.friendId }
        });
        if (friend) {
            await friend.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Friend not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addFriend,
    getFriends,
    removeFriend
};
