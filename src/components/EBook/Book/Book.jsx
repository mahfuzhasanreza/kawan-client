import { Link } from 'react-router-dom';

const Book = ({ books }) => {

    const { _id, title, cover, author, rating, category, quickSummery, aboutAuthor, publishDate, language, audio, book, __v } = books;

    return (
        <>
            <div className="card card-compact bg-base-100 w-full p-5 shadow-xl">
                <figure className='bg-blue-200 rounded-2xl'>
                    <img
                        src={cover}
                        className='h-[200px] object-fill w-full'
                        alt={title} />
                </figure>
                <div className="card-body">
                    <div>
                        <button className="btn btn-xs bg-green-200 text-green-500">{category}</button>
                    </div>
                    <h2 className="card-title">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Author: {author}</p>
                    <div className="border-t-2 border-dashed"></div>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline">{category}</div>
                        <div>{rating}</div>
                        {/* <div>{totalPages}</div> */}
                        <div className="rating">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" defaultChecked />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-100" />
                        </div>
                    </div>

                    <Link to={`/books/${_id}`}>
                        <button className="btn text-purple-700 w-full mt-5 ml-0 border-purple-700 rounded-xl ">Explore Now</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Book;