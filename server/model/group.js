const mongoose = require("mongoose");


const userIDSchema = new mongoose.Schema({
  userID: { type: String, required: true, min: 6, max: 255 },
  socketID: { type: String, required: true, min: 6, max: 255 }
});
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true, max: 1024 },
  fromUser: { userIDSchema },
  toUser: { userIDSchema },
  date: {
    type: Date,
    default: Date.now,
  },
});

const GroupSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  users: {
    type: [userIDSchema],
    required: true,
  },
  messages: {
    type: [messageSchema],
  },
});


module.exports = mongoose.model("gropus", GroupSchema);
