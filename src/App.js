import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import UserDetails from "./Detail";

function UserList({ users, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="users-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li 
            key={user.id} 
            onClick={() => navigate(`/ultra/${user.id}`)} 
            style={{ cursor: "pointer" }}
          >
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChildApp() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter basename="/">
      <div className="App">
        <header className="App-header">
          <h1>Child App (ultra-next.bbpd.io)</h1>
          <Routes>
            <Route
              path="/ultra"
              element={<UserList users={users} loading={loading} />}
            />
            <Route
              path="/ultra/:id"
              element={<UserDetails />}
            />
          </Routes>
          <a href="/" className="back-button">
            Back to Parent
          </a>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default ChildApp;
