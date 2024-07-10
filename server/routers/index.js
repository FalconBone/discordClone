const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const serverRoutes = require('./serverRoutes')
const serverMemberRoutes = require('./serverMemberRoutes')
const channelRoutes = require('./channelRoutes')
const messageRoutes = require('./messageRoutes')
const friendRoutes = require('./friendRoutes')
const directMessageRoutes = require('./directMessageRoutes')
const roleRoutes = require('./roleRoutes')

router.use('/users', userRoutes);
router.use('/servers', serverRoutes);
router.use('/server-members', serverMemberRoutes);
router.use('/channels', channelRoutes);
router.use('/messages', messageRoutes);
router.use('/friends', friendRoutes);
router.use('/direct-messages', directMessageRoutes);
router.use('/roles', roleRoutes);

module.exports = router