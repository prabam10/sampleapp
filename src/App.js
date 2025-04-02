import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function ChildApp() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use absolute URL or proper relative path for API calls
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter basename="/">
      <div className="App">
        <header className="App-header">
          <h1>Child App (ultra)</h1>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="users-list">
              <h2>User List</h2>
              <ul>
                {users.map(user => (
                  <li key={user.id}>
                    {user.name} - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Use Link component for proper routing */}
          <a href="/" className="back-button">
            Back to Parent
          </a>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default ChildApp;
