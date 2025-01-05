import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { updateProfile } from 'firebase/auth'; // Import Firebase updateProfile function
import { auth } from '../../firebase.init';

const Profile = () => {
    const { user } = useContext(AuthContext); // Fetch logged-in user's data from AuthContext
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [newName, setNewName] = useState(user?.displayName || ''); // For profile name input
    const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || ''); // For profile photo URL input

    const handleUpdateProfile = async () => {
        try {
            // Update profile in Firebase
            await updateProfile(auth.currentUser, {
                displayName: newName,
                photoURL: newPhotoURL,
            });

            // Close modal after update
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-5 min-h-screen bg-base-200 flex flex-col items-center pt-10">
            <Helmet>
                <title>Profile | Kawan</title>
            </Helmet>

            <h1 className="text-3xl lg:mt-0 mt-10">Welcome, {user.displayName || 'User'}!</h1>

            <div className="card bg-white shadow-xl w-96 mt-10 p-5">
                <div className="flex justify-center mb-5">
                    <img
                        src={user.photoURL || ''}
                        alt="User Avatar"
                        className="rounded-full w-32 h-32 object-cover"
                    />
                </div>
                <div className="space-y-3 text-center">
                    <p><strong>Name:</strong> {user.displayName || 'Not Provided'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="mt-5 flex justify-center">
                    <button
                        onClick={() => setIsModalOpen(true)} // Open the modal
                        className="btn btn-primary bg-purple-600 border-none hover:bg-purple-500 text-white font-semibold"
                    >
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Modal for updating profile */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-80">
                        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Photo URL</label>
                                <input
                                    type="text"
                                    value={newPhotoURL}
                                    onChange={(e) => setNewPhotoURL(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)} // Close the modal
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateProfile} // Update the profile
                                className="btn btn-primary bg-purple-600 border-none hover:bg-purple-500"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
