const tokenVerifier = require("./routes/verifyToken");
const { addUserToRoom, removeUserFromRoom, getUserData, getUsersInRoom } = require("./manageUsers");

let socketEvents = async (socket, io) => {
  console.log("new web socket connection");
  socket.on("join", async ({userToken , room}, callback) => {
    let userID = tokenVerifier(userToken, callback);
    if (!userID) return;
    let user = await addUserToRoom(userID, socket.id, room);

    socket.join(room);
    socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${room}.` });
    socket.broadcast.to(room).emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(room).emit("roomData", { room: room, users: await getUsersInRoom(room) });

    callback();
  });

  socket.on("sendMessage", async ({ message, userToken, room }, callback) => {
    let userID = tokenVerifier(userToken, callback);
    if (!userID) return;
    let user = await getUserData(userID);
    io.to(room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", async () => {
    console.log("user left");
    // let userID = tokenVerifier(userToken, callback);
    // if (!userID) return;
    // const user = await removeUserFromRoom(socket.id);

    // if (user) {
    //   io.to(room).emit("message", { user: "Admin", text: `${user.name} has left.` });
    //   io.to(room).emit("roomData", { room: room, users: getUsersInRoom(room) });
    // }
  });
};

module.exports = socketEvents;
