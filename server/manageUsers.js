const Group = require("./model/group");
const User = require("./model/user");

let addUserToRoom = async (userID, socketID, roomID) => {
  let room = await Group.findOne({ roomID });
  if (!room) {
    let group = new Group({
      roomID: roomID,
      users: [{ userID, socketID }],
      messages: [],
    });
    await group.save();
  } else {
      if(room.users.map(ele=>{ele.userID}).indexOf(userID)!=-1){
    let users = room.users && room.users.length > 0 ? [...room.users, { userID, socketID }] : [{ userID, socketID }];
    await Group.updateOne(
      { roomID },
      {
        $set: {
          users: users,
        },
      }
    );}
  }
  let user = User.findById(userID);
  let contacts = user.contacts && user.contacts.length > 0 ? [...user.contacts, { socketID }] : [{ socketID }];
  await User.updateOne(user, {
    $set: {
      contacts: contacts,
    },
  });
  return user;
};

let getUsersInRoom = async roomID => {
  let room = await Group.findOne({ roomID });

  if(room&&room.users&&room.users.length>0) return room.users.map(user => user.userID);
};

let getUserData = async userID => await User.findById(userID);

let removeUserFromRoom = async socketID => {
  let groups = await Group.find({
    users: {
      $elemMatch: {
        socketID: socketID,
      },
    },
  });

  groups.forEach(group => {});
  //   let user = await User.findById(userID);
  //   let group = await Group.findOne({ roomID });

  //   let contacts = user.contacts.splice(contacts.indexOf({ socketID }), 1);
  //   let users = group.users.splice(users.indexOf({ userID, socketID }), 1);

  //   await User.update(user, {
  //     $set: {
  //       contacts: contacts,
  //     },
  //   });
  //   await Group.update(
  //     { roomID },
  //     {
  //       $set: {
  //         users: users,
  //       },
  //     }
  //   );
};

module.exports = { addUserToRoom, removeUserFromRoom, getUserData, getUsersInRoom };
