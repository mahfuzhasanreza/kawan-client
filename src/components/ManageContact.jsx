import React, { useState, useEffect } from "react";
import { FaEnvelope, FaTrashAlt, FaCheckCircle, FaReply, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contact");
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load contacts.");
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/contact/${email}`);
      setContacts((prev) => prev.filter((contact) => contact.email !== email));
      setSelectedContact(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl font-semibold">{error}</div>;
  }

  return (
    <div className="h-screen mt-12 max-w-5xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-center text-fuchsia-700 mb-8">Manage Contacts</h1>
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-200"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-gray-800">
                <FaEnvelope className="inline-block text-indigo-500 mr-2" />
                {contact.email}
              </span>
              <span className="text-gray-600">{contact.message}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.location.href = `mailto:${contact.email}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <FaReply className="inline-block mr-2" /> Reply
              </button>
              <button
                onClick={() => setSelectedContact(contact)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTrashAlt className="inline-block mr-2" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the contact <strong>{selectedContact.email}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(selectedContact.email)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
