import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("http://merndemoback.herokuapp.com/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://merndemoback.herokuapp.com/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div class="container details ">
              <div class="card text-white bg-dark mb-3">
              <p class="card-header text-center">Name: {user.name}</p>
              <p class="card-header text-center">Age: {user.age}</p>
              <p class="card-header text-center">Username: {user.username}</p>
              </div>
              
            </div>
          );
        })}
      </div>

      <div class="input-group d-flex justify-content-center container ">
        <input
          class="form-control text-white bg-dark"
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
        class="form-control text-white bg-dark"
          type="number"
          placeholder="Age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
        class="form-control text-white bg-dark"
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button class="btn btn-primary" onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;
