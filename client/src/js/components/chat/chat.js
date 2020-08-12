import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
const ENDPOINT = "http://localhost:3000/";

export default function Chat(props) {
  const [userToken, setToken] = useState("");
  const [room, setRoom] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (props.location.userToken && userToken != props.location.userToken) setToken(props.location.userToken);
    setRoom(123456);
    socket = io(ENDPOINT);
    // console.log(socket);
    socket.emit("join", { userToken, room }, error => {
      if (error) alert(error);
    });
  }, [ENDPOINT, props.location]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, []);

  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          type="text"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
          onKeyPress={e => (e.key == "Enter" ? sendMessage(e) : null)}
        />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
}
