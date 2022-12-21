import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  // Data Member
  let inputRef = useRef();
  let [title] = useState("Messaging App");
  let [message, setMessage] = useState("");
  let [messageList, setMessageList] = useState([]);

  // Spl Funcn :: Hook :: Like Constructor ::  Called while the Compoent is Initialized.
  useEffect(() => {
    // console.log("I AM GETTING CALLED");
    getAllMessages();
  }, []);

  // Member Funcns
  let handleOnChangeMessage = (e) => {
    message = e.target.value;
    setMessage(message);
    // setMessage(e.target.value)
  };

  let getAllMessages = async () => {
    let url = `http://localhost:3001/messages`;
    let response = await axios.get(url);
    // console.log(response);

    // Getting the Message From Server :: And re-rendering
    messageList = [...response.data];
    setMessageList(messageList);
  };

  let createNewMessage = async (reply) => {
    let url = `http://localhost:3001/message`;
    // console.log(inputRef.current);
    if (!inputRef.current.checkValidity()) {
      alert("Invalid");
      return;
    }

    let data = {
      message: message,
      messageTime: new Date(),
      reply: reply,
    };

    await axios.post(url, data);

    setMessage("");

    // To Refresh the content
    getAllMessages();
  };

  let checkEnterCode = (e) => {
    if (e.keyCode == 13) {
      createNewMessage();
    }
  };

  return (
    <div>
      <h1 className="bg-dark text-light p-3">{title}</h1>

      <div className="d-flex">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Hi...whatsapp...!!"
          value={message}
          onChange={handleOnChangeMessage}
          onKeyUp={checkEnterCode}
          ref={inputRef} // document.querySelector()
          required
          minLength={2}
        />
        <input
          className="btn btn-secondary"
          type="button"
          value="Add"
          onClick={() => createNewMessage(false)}
        />
        <input
          className="btn btn-secondary"
          type="button"
          value="Reply"
          onClick={() => createNewMessage(true)}
        />
      </div>

      {messageList.map((item, index) => (
        <div
          key={index}
          className={
            item.reply
              ? "d-flex justify-content-end my-1"
              : "d-flex justify-content-start my-1"
          }
        >
          <div className="badge text-bg-secondary">
            {item.message}
            <span className="ms-4">
              {new Date(item.messageTime).getHours()}:
              {new Date(item.messageTime).getMinutes()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
