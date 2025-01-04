import React from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { addToStoredReadList, addToStoredWishList } from '../../../utility/addToDb';
import { Helmet } from 'react-helmet-async';

const BookDetail = () => {

    const { id } = useParams();
    // console.log(id);
    const loaderData = useLoaderData();
    const data = loaderData.data;
    // console.log(data);

    console.log(typeof id, typeof data[0]._id);

    const bookDetails = data.find(book => book._id === id);
    // console.log(book);

    const { _id, title, cover, author, rating, category, quickSummery, aboutAuthor, publishDate, language, audio, book, __v } = bookDetails;

    return (
        <div className='my-12'>
            <Helmet>
                <title>Book Details | {title}</title>
            </Helmet>
            <div className='ml-40 grid grid-cols-2'>
                <div className='space-y-4'>
                    <img className='w-2/5' src={cover} alt="" />

                    <h2 className="card-title">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Author: {author}</p>
                    <div className='flex gap-3'>
                        <p>Category:</p>
                        <button className="btn btn-xs bg-green-200 text-green-500">{category}</button>
                    </div>
                    <div className="bg-green-600 text-black w-1/5 border-t-2 border-dashed"></div>
                    <div>
                        <p>Rating: {rating}</p>
                        <p>Publish Date: {publishDate}</p>
                        <p>Language: {language}</p>
                    </div>
                </div>
                <div className='mr-40 text-center space-y-24'>
                    <div className='space-y-5'>
                        <p className='text-3xl'>
                            Summary: {quickSummery}
                        </p>
                        <p className='text-gray-600'>Author Details: {aboutAuthor}</p>
                    </div>

                    {/* chapter details */}
                    <div className='space-y-5 gap-5'>
                        <Link to={`/b1`}>
                            <button className='mb-5 btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-black'>Chapter 1</button>
                        </Link>
                        <Link to={`/b2`}>
                            <button className='btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-black'>Chapter 2</button>
                        </Link>
                        <button className='btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-black'>Chapter 3</button>
                        <button className='btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-black'>Chapter 4</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookDetail;