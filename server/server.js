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
let socketEvents = require("./socket")

//import routes
const authRoute = require("./routes/auth");

dotenv.config();
//DB Connection
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to DB");
});
//middleWares
app.use(cors())
app.use(express.json());



//route middleWares
app.use("/api/user", authRoute);
//socket.io all functionalities
io.on("connection", socketEvents);

server.listen(port, () => console.log(`Server running on port ${port}`));
