import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import UserDetails from "./Details";

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
            onClick={() => navigate(`/${user.id}`)} 
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

  // Dynamically determine the basename based on the current URL
  const basename = window.location.pathname.split('/')[1]
  ? `/${window.location.pathname.split('/')[1]}`
  : '/';
  
  console.log("ChildApp Rendered", basename);

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
    <BrowserRouter basename={basename}>
      <div className="App">
        <header className="App-header">
          <h1>Child App (ultra-next.bbpd.io)</h1>
          <Routes>
            <Route
              path="/"
              element={<UserList users={users} loading={loading} />}
            />
            <Route
              path="/:id"
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
