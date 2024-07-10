// socketHandlers.js

const { Message, DirectMessage } = require('./models/models');
const actions = require('./actions');

const handleMessage = async (io, socket, data) => {
    try {
        const message = await Message.create({
            channel_id: data.channelId,
            user_id: data.userId,
            content: data.content,
            type: data.messageType
        });

        io.emit(actions.MESSAGE, { type: actions.MESSAGE, message });
    } catch (error) {
        console.error('Error handling message:', error);
    }
};

const handleDirectMessage = async (io, socket, data) => {
    try {
        const directMessage = await DirectMessage.create({
            sender_id: data.senderId,
            receiver_id: data.receiverId,
            content: data.content
        });

        io.to(data.senderId).to(data.receiverId).emit(actions.DIRECT_MESSAGE, {
            type: actions.DIRECT_MESSAGE,
            message: directMessage
        });
    } catch (error) {
        console.error('Error handling direct message:', error);
    }
};

const handleCallRequest = (io, socket, data) => {
    io.to(data.receiverId).emit(actions.CALL_REQUEST, {
        callerId: data.callerId,
        receiverId: data.receiverId
    });
};

module.exports = {
    handleMessage,
    handleDirectMessage,
    handleCallRequest
};
