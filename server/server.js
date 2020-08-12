const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = 3000;
const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketio = require("socket.io");
var io = socketio(server);

dotenv.config();
//DB Connection
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to DB");
});
//middleWares
app.use(cors())
app.use(express.json());

//import routes
const authRoute = require("./routes/auth");

//route middleWares
app.use("/api/user", authRoute);

io.on("connection", socket => {
  console.log("new web socket connection");
  socket.on('disconnect',()=>{
    console.log('user left')
  })
});

server.listen(port, () => console.log(`Server running on port ${port}`));
