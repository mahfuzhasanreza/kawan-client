import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Blocks } from "react-loader-spinner";
import { useEffect, useState } from "react";
import HealthSideBar from "../../HealthSideBar";
import Blog from "../Blog/Blog";

const AvailableBlogs = () => {
    const blogs = useLoaderData(); // Initial data from loader
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [loadedBlogs, setLoadedBlogs] = useState([]); // State for blogs
    const [loading, setLoading] = useState(true); // State for loading spinner
    const [sortOption, setSortOption] = useState(""); // State for sorting option

    useEffect(() => {
        setTimeout(() => {
            if (Array.isArray(blogs)) {
                setLoadedBlogs(blogs);
            } else {
                console.error("Expected blogs to be an array but got", blogs);
            }
            setLoading(false); // Disable loading after data is set
        }, 1000); // Adjust delay as needed
    }, [blogs]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter blogs based on the search query
        const filteredBlogs = blogs.filter((blog) => 
            blog.title.toLowerCase().includes(query) ||
            blog.author.toLowerCase().includes(query)
        );
        setLoadedBlogs(filteredBlogs);
    };

    const handleSort = (e) => {
        const option = e.target.value;
        setSortOption(option);

        // Sort blogs based on the selected option (e.g., by date)
        if (option === "date") {
            const sortedBlogs = [...loadedBlogs].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            setLoadedBlogs(sortedBlogs);
        }
    };

    return (
        <>
            <HealthSideBar />
            <div className="mt-10 lg:mt-36 mb-10 lg:mb-36">
                <Helmet>
                    <title>Health Blogs | FoodLink</title>
                </Helmet>

                {/* Show Spinner if Loading */}
                {loading ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-0">
                        <Blocks
                            height="100"
                            width="100"
                            color="#4fa94d"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            visible={true}
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-10 lg:mb-20 text-orange-700">
                            Health Blogs
                        </h2>

                        {/* Search and Sort Section */}
                        <div className="flex flex-col mx-auto md:flex-row justify-center px-10 mb-10 gap-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search by title or author..."
                                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            />
                            <select
                                value={sortOption}
                                onChange={handleSort}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            >
                                <option value="">Sort By</option>
                                <option value="date">Date</option>
                            </select>
                        </div>

                        {/* Blogs Grid */}
                        <div className="flex mx-20">
                            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {Array.isArray(loadedBlogs) && loadedBlogs.length > 0 ? (
                                    loadedBlogs.map((blog) => (
                                        <Blog blog={blog} key={blog.id} />
                                    ))
                                ) : (
                                    <p>No blogs available</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AvailableBlogs;
