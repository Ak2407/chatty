import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

//no dotenv
const socket = io.connect("http://localhost:6969");
const username = nanoid(4);

function App() {
  const [message, setmessage] = useState("");
  const [chat, setchat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message,  username});
    setmessage("");
  };


  useEffect(() => {
    socket.on("chat", (payload) => {
      setchat([...chat, payload])
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>


      {chat.map((payload, index) => {
        return (
          <p key={index}>{payload.message} : <span>id: {payload.username}</span></p>
        )
      })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <button type="submit">SEND</button>
        </form>
      </header>
    </div>
  );
}

export default App;
