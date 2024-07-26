import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaSearch, FaFilter, FaCaretDown, FaCaretUp, FaEdit, FaTrash, FaEye, FaEyeSlash
} from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'User',
    password: ''
  });
  const [currentUserId, setCurrentUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiEndpoint = `https://cad88c3dc5b43bd47267.free.beeceptor.com/api/users/`;

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(apiEndpoint);
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handler for search input
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Handler to toggle role dropdown
  const toggleRoleDropdown = () => setIsRoleDropdownOpen(!isRoleDropdownOpen);

  // Handler to toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Handler to toggle edit user modal
  const toggleEditModal = (user) => {
    if (user) {
      setFormData({
        fullName: user.name,
        email: user.email,
        role: user.role,
        password: ''
      });
      setCurrentUserId(user.id);
    }
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Handler to toggle delete user modal
  const toggleDeleteModal = (userId) => {
    setCurrentUserId(userId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler for form submission (Edit User)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updatedUser = {
        name: formData.fullName,
        email: formData.email,
        role: formData.role
      };
      await axios.put(`${apiEndpoint}/${currentUserId}`, updatedUser);
      setUsers(users.map(user => (user.id === currentUserId ? updatedUser : user)));
    } catch (error) {
      setError('Failed to update user');
    } finally {
      setLoading(false);
      setIsEditModalOpen(false);
      setFormData({
        fullName: '',
        email: '',
        role: 'User',
        password: ''
      });
    }
  };

  // Handler for deleting a user
  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${apiEndpoint}/${currentUserId}`);
      setUsers(users.filter(user => user.id !== currentUserId));
    } catch (error) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      {/* Header with Search Box and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="relative w-full md:w-auto md:flex-grow max-w-lg mb-4 md:mb-0">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={toggleRoleDropdown}
            className="flex items-center px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
          >
            <FaFilter className="mr-2" />
            Filter
            {isRoleDropdownOpen ? <IoMdArrowDropup className="ml-2" /> : <IoMdArrowDropdown className="ml-2" />}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email Address</th>
              <th className="px-4 py-2 text-left">
                Role
                <button onClick={() => setSortBy(sortBy === 'role' ? '' : 'role')} className="ml-2">
                  {sortBy === 'role' ? <FaCaretUp /> : <FaCaretDown />}
                </button>
              </th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="4" className="text-center">Loading...</td></tr>}
            {error && <tr><td colSpan="4" className="text-center text-red-500">{error}</td></tr>}
            {users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {item.name}
                </td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2 font-bold text-blue-500">{item.role}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleEditModal(item)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <FaEdit className="inline-block" /> Edit
                  </button>
                  <button
                    onClick={() => toggleDeleteModal(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FaTrash className="inline-block" /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                &times;
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create Password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-right">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Delete User</h2>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                &times;
              </button>
            </div>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
