import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  const reciveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900  px-14 p-10">
        <h1 className="text-2xl font-bold my-2">Chat-mail</h1>
        <input
          type="text"
          className="border-2 border-zinc-500 p-2 w-full text-black"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message...."
          autoFocus
          value={message}
        />
        <ul className="mt-3">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me" ? "bg-sky-700 " : "bg-black ml-auto"
              }`}
            >
              <span
                className={`text-xs block ${
                  message.from !== "Me" ? "text-green-400" : "text-black"
                }`}
              >
                {message.from}
              </span>
              <span className="text-md">{message.body}</span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
