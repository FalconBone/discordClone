const express = require('express')
const cors = require('cors')
// const http = require('http')
// const ACTIONS = require('./actions')
// const {validate, version} = require('uuid')
const router = require('./routers/index')
const bodyParser = require('body-parser')
const initSocketServer = require('./socketServer');

const app = express()
//const server = http.createServer(app)
//const io = require('socket.io')(server)
app.use(cors)
app.use(bodyParser.json());
app.use('/api', router)

// const getClientRooms = () => {
//     const {rooms} = io.sockets.adapter

//     return Array.from(rooms.keys()).filter(roomId => validate(roomId) && version(roomId) === 4)
// }

// const shareRoomsInfo = () => {
//     io.emit(ACTIONS.SHARE_ROOMS, {
//         rooms: getClientRooms()
//     })
// }


// io.on("connect", (socket) => {
//     shareRoomsInfo()

//     socket.on(ACTIONS.JOIN, (config) => {
//         const {room : roomId} = config
//         const {rooms: joinedRooms} = socket 

//         if (Array.from(joinedRooms).includes(roomId)) {
//             return console.warn(`Already joined to ${roomId}`)
//         }

//         const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])

//         clients.forEach(clientId => {
//             io.to(clientId).emit(ACTIONS.ADD_PEER, {
//                 peerId: socket.id,
//                 createOffer: false
//             })

//             socket.emit(ACTIONS.ADD_PEER, {
//                 peerId: clientId,
//                 createOffer: true
//             })
//         })

//         socket.join(roomId)
//         shareRoomsInfo()
//     })

//     const leaveRoom = () => {
//         const {rooms} = socket
    
//         Array.from(rooms).forEach(roomId => {
//             const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])

//             clients.forEach(clientId => {
//                 io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
//                     peerId: socket.id
//                 })

//                 socket.emit(ACTIONS.REMOVE_PEER, {
//                     peerId: clientId
//                 })
//             })

//             socket.leave(roomId)
//         })

//         shareRoomsInfo()
//     }

//     socket.on(ACTIONS.LEAVE, leaveRoom)
//     socket.on('disconnecting', leaveRoom)

    
// })



// server.listen(5000, () => {
//     console.log('Server started on port ', 5000);
// })

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = initSocketServer(server);