const {Server} = require("socket.io")

const disconnect = (socket) => {
  console.log(`CLIENT DISCONNECTED SOCKET ID ${socket.id}`);

  for (const [userId, socketId] of userSocketMapping.entries()) {
    if (socketId === socket.id) {
      userSocketMapping.delete(userId);
      break;
    }
  }
};
const userSocketMapping = new Map();
const socketSetup = (httpServer) => {
  // Creating An IO Instance
  const IO = new Server(httpServer, {
    cors: {
      origin:"http://localhost:5173",
      methods: ["GET", "POST"],
      credentials:true
    },
  });
  IO.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    
    if (userId) {
      userSocketMapping.set(userId, socket.id);
      console.log(
        `CLIENT CONNECTED WITH SOCKET ID ${socket.id} AND USER ID ${userId}`
      );
    } else {
      console.log("NO USER ID FOUND");
    }

    socket.on("update-appilcation-status",(data)=>{
      console.log("YEEEEEAh",data);
      const reciverSocketId = userSocketMapping.get(data.applicantId);
      console.log(reciverSocketId,"RSTD");
      


      IO.to(reciverSocketId).emit("updated-application-status",{"status":data.status,"applicationId":data.applicationId});
      
    })
    // socket.emit(
    //   "join-message",
    //   `WLCOME FROM SERVER USER WITH USER ID :: ${socket.id} `
    // );
    // socket.broadcast.emit(
    //   "join-message",
    //   `THE NEW USER WITH USER ID :: ${socket.id} HAS JOINED`
    // );
  });
};

module.exports =  socketSetup;
