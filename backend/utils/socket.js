export default (socket, io) => {
    console.log(`Socket connected: ${socket.id}`);
    
    socket.on('join-admin-room', () => {
      socket.join('admin-room');
      console.log('Admin joined room');
    });
  
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  };