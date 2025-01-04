import { useEffect, useState } from 'react';
import Book from '../Book/Book';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('https://kawan.onrender.com/api/v1/ebook')
            .then(res => res.json())
            .then(data => {
                console.log(data.data);
                setBooks(data.data);
            });
    }, []);

    // Filter books based on search query
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );

    return (
        <div className='w-3/4 mx-auto mt-10'>
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

            {/* Display filtered books */}
            <div className='mt-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    filteredBooks.map(book => <Book books={book} key={book._id}></Book>)
                }
            </div>
        </div>
    );
};

export default AllBooks;
