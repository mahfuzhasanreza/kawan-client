import { Link } from 'react-router-dom';
import { UsersIcon, DocumentTextIcon, ShieldExclamationIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const HomeContent = () => {
    return (
        <div className="pb-24 pt-20 bg-gray-100">
            {/* Header */}
            {/* <header className="bg-fuchsia-800 text-white py-4 px-6 shadow-md">
                <h1 className="text-3xl font-semibold">Kawan Admin Dashboard</h1>
                <p className="text-lg mt-2">Manage your platform and empower your community</p>
            </header> */}

            {/* Dashboard Content */}
            <div className="px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* User Management Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <UsersIcon className="h-16 w-16 text-fuchsia-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">User Management</h2>
                        <p className="text-gray-600 mb-4">View, edit, and manage user accounts</p>
                        <Link to="/user-list" className="text-fuchsia-600 hover:text-fuchsia-800">Manage Users</Link>
                    </div>

                    {/* Professional Verification Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <ShieldExclamationIcon className="h-16 w-16 text-fuchsia-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Professional Verification</h2>
                        <p className="text-gray-600 mb-4">Verify professionals and track requests</p>
                        <Link to="/professional-verification" className="text-fuchsia-600 hover:text-fuchsia-800">Verify Professionals</Link>
                    </div>

                    {/* Professional Management Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <UsersIcon className="h-16 w-16 text-fuchsia-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Professional Management</h2>
                        <p className="text-gray-600 mb-4">View, edit, and manage professional accounts</p>
                        <Link to="/professional-management" className="text-fuchsia-600 hover:text-fuchsia-800">Manage Professionals</Link>
                    </div>

                    

                    {/* Content Management Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <DocumentTextIcon className="h-16 w-16 text-fuchsia-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Manage Contact Us Section</h2>
                        <p className="text-gray-600 mb-4">Efficiently handle user inquiries and provide a seamless communication</p>
                        <Link to="/manage-contact" className="text-fuchsia-600 hover:text-fuchsia-800">Manage Content</Link>
                    </div>


                    {/* Reports Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <ChartBarIcon className="h-16 w-16 text-fuchsia-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Reports</h2>
                        <p className="text-gray-600 mb-4">Analyze platform performance and user activities</p>
                        <Link to="/reports" className="text-fuchsia-600 hover:text-fuchsia-800">View Reports</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
