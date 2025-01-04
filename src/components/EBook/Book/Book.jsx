import { Link } from 'react-router-dom';

const Book = ({ books }) => {

    const { _id, title, cover, author, rating, category, quickSummery, aboutAuthor, publishDate, language, audio, book, __v } = books;

    return (
        <Link to={`/books/${_id}`}>
            <div className="card bg-base-100 w-96 shadow-xl p-6">
                <figure className='bg-blue-200 py-8 rounded-2xl'>
                    <img
                        src={cover}
                        className='h-[166px]'
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
                </div>
            </div>
        </Link>
    );
};

export default Book;