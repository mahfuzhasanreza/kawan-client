import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog = {} }) => {
    const { id, title, author, date, content } = blog;

    if (!blog || Object.keys(blog).length === 0) {
        return (
            <div className="text-center text-red-500">
                Blog details are not available.
            </div>
        );
    }

    return (
        <div className="z-0 card bg-slate-200 w-full p-8 m-0 shadow-xl">
            <div className="card-body">
                <h2 className="text-orange-700 font-bold text-xl">{title}</h2>
                <div className="text-sm text-gray-500 mb-4">
                    <p>By: {author}</p>
                    <p>Date: {new Date(date).toLocaleDateString()}</p>
                </div>
                <p className="text-lg text-gray-700 mb-4">{content.slice(0, 200)}...</p>

                <Link to={`/blog/${id}`}>
                    <button className="btn text-orange-700 border-orange-700 rounded-full">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
