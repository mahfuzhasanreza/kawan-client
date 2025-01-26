import React, { useState, useEffect } from "react";
import { FaEnvelope, FaUser, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://kawan.onrender.com/api/v1/user");
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl font-semibold">{error}</div>;
  }

  return (
    <div className="mt-12 mb-20 max-w-5xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-center text-fuchsia-600 mb-8 border-4 border-fuchsia-200 p-4 border-dashed">
        User List
      </h1>

      {/* Search Input */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
          />
        </div>
      </div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-200"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <FaUser className="text-indigo-500 text-lg" />
                <span className="font-medium text-gray-700">{user.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-indigo-500 text-lg" />
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-indigo-500 text-lg" />
                <span className="text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg">No users found.</div>
        )}
      </motion.div>
    </div>
  );
};

export default UserList;
