import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data));
    // response.data contains the parsed JSON from the API.
    // setUsers(data) updates the React state with that JSON and stores it in state so you can access it.
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List (using Axios)</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white shadow p-4 rounded-xl cursor-pointer">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
    //Map through the stored data in the state and display the contents
    // in a list and access the properties from the data(user.name)
  );
}

export default App;
