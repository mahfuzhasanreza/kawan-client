import { useEffect, useState } from 'react';
import Book from '../Book/Book';

const AllBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://kawan.onrender.com/api/v1/ebook')
            .then(res => res.json())
            .then(data => {
                console.log(data.data);
                setBooks(data.data);
            }
            )
    }, []);

    return (
        <div className='w-3/4 mx-auto'>
            <h2 className="text-4xl font-bold text-center">Books</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    books.map(book => <Book books={book} key={book._id}></Book>)
                }
            </div>
        </div>
    );
};

export default AllBooks;