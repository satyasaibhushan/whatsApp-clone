const Group = require("./model/group");
const User = require("./model/user");

let addUserToRoom = async (userID, socketID, roomID) => {
  userID = userID._id;
  let userInfo;
  await Group.findOne({ roomID }, function (err, room) {
    if (room) {
      let users = room.users;
      let index = users.map(ele => ele.userID).indexOf(userID);
      if (index == -1) room.users = [...room.users, { userID, socketID }];
      else room.users[index].socketID = socketID;

      room.save();
    } else {
      let group = new Group({
        roomID: roomID,
        users: [{ userID, socketID }],
        messages: [],
      });
      group.save();
    }
  });
  await User.findById(userID, (err, user) => {
    let contacts = user.contacts;
    userInfo = user;
    let index = contacts.map(ele => ele.roomID).indexOf(roomID);
    if (index == -1) user.contacts = [...user.contacts, { roomID, socketID }];
    else user.contacts[index].socketID = socketID;
    user.save();
  });
  return userInfo;
};

let getUsersInRoom = async roomID => {
  let userIDs;
  await Group.findOne({ roomID }, (err, room) => {
    userIDs = room.users.map(user => user.userID);
  });

  return userIDs;
};

let getUserData = async userID => {
  userID = userID._id;
  let userInfo;
  await User.findById(userID, (err, user) => {
    userInfo = user;
  });
  return userInfo;
};

let removeUserFromRoom = async socketID => {
  let userID, userInfo;

  await Group.findOne({ "users.socketID": socketID }, async (err, group) => {
    if (group) {
      let index = group.users.map(ele => ele.socketID).indexOf(socketID);
      userID = group.users[index].userID;
      group.users.splice(index, 1);
      await group.save();

      await User.findById(userID, async (err, user) => {
        userInfo = user;
        let index = user.contacts.map(ele => ele.socketID).indexOf(socketID);
        user.contacts.splice(index, 1);
        await user.save();
      });
    }
  });

  return userInfo;

};

module.exports = { addUserToRoom, removeUserFromRoom, getUserData, getUsersInRoom };
