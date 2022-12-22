import axios from "axios";
import { useState } from "react";

function App() {
  let [title] = useState("API DEMO");
  let [messageList, setMessageList] = useState([]);

  // Funcns
  let getAllMessages = async () => {
    let url = `http://localhost:3000/messages`;
    let response = await axios.get(url);
    // console.log(response);

    // Getting the Message From Server :: And re-rendering
    messageList = [...response.data];
    setMessageList(messageList);
  };

  return (
    <div>
      <h1>{title}</h1>

      <input
        type="button"
        value="Make Ajax/API Call"
        onClick={getAllMessages}
      />

      {messageList.map((item) => (
        <div>{item.message}</div>
      ))}
    </div>
  );
}

export default App;
