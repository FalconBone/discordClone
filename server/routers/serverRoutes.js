const express = require('express');
const {
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer
} = require('../controllers/serverController');

const router = express.Router();

router.post('/', createServer);
router.get('/', getServers);
router.get('/:id', getServerById);
router.put('/:id', updateServer);
router.delete('/:id', deleteServer);

module.exports = router;
