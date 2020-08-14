import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";

let socket;
const ENDPOINT = "http://localhost:3000/";

export default function Chat(props) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const room = useRef(null)
  const userToken = useRef(null)

  useEffect(() => {
    room.current= 123456;
    userToken.current = props.location.userToken
    socket = io(ENDPOINT);
    if (room.current)
      socket.emit("join", { userToken: userToken.current, room: room.current }, error => {
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
    if (inputValue) {
      socket.emit("sendMessage", { message :inputValue,userToken: userToken.current,room: room.current}, error => {
        if (error) alert(error);
        else setInputValue("");
      });
    }
  };
  console.log(messages, inputValue);

  return (
    <div className="chatContainerTotal">
      <div className="chatContainer">
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
