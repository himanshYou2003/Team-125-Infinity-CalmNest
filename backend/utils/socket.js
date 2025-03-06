import Message from '../models/Message.js';

export default (socket, io) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('send_message', async (message) => {
    try {
      const newMessage = await Message.create({
        content: message.content,
        anonymousId: message.anonymousId
      });
      
      io.emit('receive_message', {
        _id: newMessage._id,
        content: newMessage.content,
        anonymousId: newMessage.anonymousId,
        createdAt: newMessage.createdAt
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};