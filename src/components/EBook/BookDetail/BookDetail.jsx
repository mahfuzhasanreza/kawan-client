import React, { useState, useEffect } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ColorRing } from 'react-loader-spinner'; // Import the ColorRing component

const BookDetail = () => {
    const { id } = useParams();
    const loaderData = useLoaderData();
    const data = loaderData.data;
    const [loading, setLoading] = useState(true); // Set the initial loading state to true

    useEffect(() => {
        // Simulate a delay (you can remove this if your data is loading from an API)
        setTimeout(() => {
            setLoading(false); // Set loading to false once the data is fetched or processed
        }, 2000); // Simulate a 2-second delay for loading data
    }, []);

    if (loading) {
        return (
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
        );
    }

    const bookDetails = data.find(book => book._id === id);
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
                    <div className='space-y-5 gap-5'>
                        <Link to={`/b1`}>
                            <button className='mb-5 btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-white'>Chapter 1</button>
                        </Link>
                        <Link to={`/b2`}>
                            <button className='btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-white'>Chapter 2</button>
                        </Link>
                        <button className='btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-white'>Chapter 3</button>
                        <button className='btn w-full bg-purple-500 border-none shadow-lg hover:bg-purple-600 text-xl text-white'>Chapter 4</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
