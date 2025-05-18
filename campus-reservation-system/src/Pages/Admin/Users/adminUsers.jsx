import React, { useState } from 'react';
import './adminUsers.css';

function AdminUsers() {
  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, firstname: 'John', lastname: 'Doe', username: 'johndoe', email: 'john@example.com', department: 'Computer Science', role: 'admin' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', username: 'janesmith', email: 'jane@example.com', department: 'Mathematics', role: 'faculty' },
    { id: 3, firstname: 'Mike', lastname: 'Johnson', username: 'mikej', email: 'mike@example.com', department: 'Physics', role: 'student' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    role: 'student',
    department: ''
  });

  // Filter users when search term changes
  const filterUsers = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
    setFilteredUsers(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterUsers();
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterUsers();
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchTerm('');
    setFilteredUsers(users);
  };

  // Handle new user form input change
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add user form submit (mock version)
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Generate a new ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    // Create new user (excluding password for display purposes)
    const userToAdd = {
      id: newId,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      username: newUser.username,
      department: newUser.department,
      role: newUser.role
    };
    
    // Add to users list
    setUsers([...users, userToAdd]);
    setFilteredUsers([...users, userToAdd]);
    
    // Reset form and close modal
    setNewUser({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      role: 'student',
      department: ''
    });
    setShowAddUserModal(false);
    
    console.log('User added (mock):', userToAdd);
    alert('User added successfully (mock)');
  };

  // Handle delete user (mock version)
  const handleDeleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    setUsers(users.filter(user => user.id !== userId));
    setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
    
    console.log('User deleted (mock) with ID:', userId);
    alert('User deleted successfully (mock)');
  };

  // Get role badge class
  const getRoleBadgeClass = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'role-badge admin';
      case 'faculty':
        return 'role-badge faculty';
      case 'student':
        return 'role-badge student';
      default:
        return 'role-badge';
    }
  };

  return (
    <div className="admin-users-container">
      <h2 className="page-title">USER MANAGEMENT</h2>
      
      <div className="controls">
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
            {searchTerm && (
              <button 
                type="button" 
                className="reset-button"
                onClick={handleResetSearch}
              >
                Reset
              </button>
            )}
          </form>
        </div>
        
        <div className="add-user-container">
          <button 
            className="add-user-button"
            onClick={() => setShowAddUserModal(true)}
          >
            Add User
          </button>
        </div>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="no-users">No users found.</div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.department || 'N/A'}</td>
                  <td>
                    <span className={getRoleBadgeClass(user.role)}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {user.role !== 'admin' && (
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstname" 
                  value={newUser.firstname} 
                  onChange={handleNewUserChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastname" 
                  value={newUser.lastname} 
                  onChange={handleNewUserChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={newUser.email} 
                  onChange={handleNewUserChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={newUser.username} 
                  onChange={handleNewUserChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={newUser.password} 
                  onChange={handleNewUserChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input 
                  type="text" 
                  name="department" 
                  value={newUser.department} 
                  onChange={handleNewUserChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  name="role" 
                  value={newUser.role} 
                  onChange={handleNewUserChange} 
                  required
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add User</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;