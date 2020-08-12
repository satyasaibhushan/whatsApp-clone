const tokenVerifier = require("./routes/verifyToken");


let socketEvents = socket => {
  console.log("new web socket connection");
//   socket.on("join", ({ userToken, room }, callback) => {
//     let userID = tokenVerifier(userToken, callback);
//     if (!userID) return;
//     let { error, user } = addUserToRoom(userID, socket.id, room);
//     if (error) callback(error);

//     socket.join(room);
//     socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${room}.` });
//     socket.broadcast.to(room).emit("message", { user: "admin", text: `${user.name} has joined!` });

//     io.to(room).emit("roomData", { room: room, users: getUsersInRoom(room) });

//     callback();
//   });

//   socket.on("sendMessage", ({ message, userToken, room }, callback) => {
//     let userID = tokenVerifier(userToken, callback);
//     if (!userID) return;
//     const user = getUserData(userID, socket.id);

//     io.to(room).emit("message", { user: user.name, text: message });

//     callback();
//   });

  socket.on("disconnect", () => {
    console.log("user left");
    // let userID = tokenVerifier(userToken, callback);
    // if (!userID) return;
    // const user = removeUserFromRoom(userID, socket.id);

    // if (user) {
    //   io.to(room).emit("message", { user: "Admin", text: `${user.name} has left.` });
    //   io.to(room).emit("roomData", { room: room, users: getUsersInRoom(room) });
    // }
  });
};

module.exports = socketEvents;
