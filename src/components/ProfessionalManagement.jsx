import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash } from 'react-icons/fa'; // Importing icons
import axios from 'axios'; // For making HTTP requests

const ProfessionalManagement = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null); // Store the email of the item to be deleted

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/verify-professionals-list');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleVerify = async (email, selectedItem) => {
        try {
            // Step 1: Send the PUT request to accept the professional
            const response = await axios.put(`http://localhost:5000/accept-professionals/${email}`);
            console.log("Verification successful", response.data);
    
            // Step 2: Update the state to reflect the change
            setData((prevData) =>
                prevData.map(item =>
                    item.email === email ? { ...item, isVerify: true } : item
                )
            );
    
            // Step 3: Send data to the backend to store it in the database
            await axios.post('http://localhost:5000/professionals-manage', selectedItem);
    
            // Optionally handle any response from the post request if needed
            console.log("Professional accepted and stored successfully");
    
            // After verifying, delete the item
            setSelectedEmail(email); // Store the email of the item to be deleted
            handleDelete(); // Pass email to handleDelete
            
        } catch (error) {
            console.error("Error verifying professional:", error);
        }
    };
    

    const handleDelete = async () => {
        if (!selectedEmail) return;

        try {
            await axios.put(`http://localhost:5000/delete-professionals/${selectedEmail}`);
            // Delete the professional from the 'req-professionals' collection
            await axios.delete(`http://localhost:5000/professionals-manage/${selectedEmail}`);

            // Remove the deleted item from state
            setData((prevData) => prevData.filter(item => item.email !== selectedEmail));

            // Close the modal
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const openModal = (email) => {
        setSelectedEmail(email);  // Store the email of the item to be deleted
        setIsModalOpen(true);     // Open the confirmation modal
    };

    const closeModal = () => {
        setIsModalOpen(false);    // Close the modal
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!data) {
        return <div className="text-5xl h-screen content-center text-center">No data available</div>;
    }

    return (
        <div className="h-screen max-w-7xl mx-auto p-6">
            <h1 className="text-5xl my-10 font-bold text-center mb-6">Verified Professionals Details</h1>

            {/* Scrollable Table */}
            <div className="overflow-x-auto">
                <table className="mt-10 min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Degree Details</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Drive Link</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Portfolio Link</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">LinkedIn Link</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id} className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-50 hover:text-white transition duration-300">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.degreeDetails}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.driveLink ? (
                                        <a href={item.driveLink} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">View Drive</a>
                                    ) : (
                                        <span className="text-gray-500">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.portfolioLink ? (
                                        <a href={item.portfolioLink} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">View Portfolio</a>
                                    ) : (
                                        <span className="text-gray-500">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.linkedinLink ? (
                                        <a href={item.linkedinLink} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">View LinkedIn</a>
                                    ) : (
                                        <span className="text-gray-500">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {/* <button
                                        onClick={() => handleVerify(item.email, item)} // Pass the item for storing
                                        className="text-green-500 hover:text-green-700 mr-7 transition duration-200 transform hover:scale-110"
                                    >
                                        <FaCheckCircle />
                                    </button> */}

                                    <button
                                        onClick={() => openModal(item.email)} // Open the modal on delete button click
                                        className="ml-6 text-red-500 hover:text-red-700 transition duration-200 transform hover:scale-110"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfessionalManagement;
