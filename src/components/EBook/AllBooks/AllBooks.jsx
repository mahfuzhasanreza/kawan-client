import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import { Helmet } from 'react-helmet-async';
import { ColorRing } from 'react-loader-spinner'; // Import ColorRing

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch('https://kawan.onrender.com/api/v1/ebook')
            .then(res => res.json())
            .then(data => {
                setBooks(data.data);
                setLoading(false); // Set loading to false when data is fetched
            });
    }, []);

    // Filter books based on search query
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );

    return (
        <div className='w-3/4 mx-auto mt-10'>
            <Helmet>
                <title>All e-Book | Kawan</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center text-purple-400">All Books</h2>

            {/* Search input */}
            <div className="my-4 text-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered border-purple-500 input-primary w-full max-w-xs"
                />
            </div>

            {/* Display loading spinner if data is being fetched */}
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : (
                // Display filtered books once data is loaded
                <div className='mt-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        filteredBooks.map(book => <Book books={book} key={book._id}></Book>)
                    }
                </div>
            )}
        </div>
    );
};

export default AllBooks;
