const express = require('express');
const {
    addServerMember,
    getServerMembers,
    removeServerMember
} = require('../controllers/serverMemberController');

const router = express.Router();

router.post('/', addServerMember);
router.get('/:serverId', getServerMembers);
router.delete('/:serverId/:userId', removeServerMember);

module.exports = router;
