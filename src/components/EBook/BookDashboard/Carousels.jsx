import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import banner1 from '../../../assets/book-carousels/banner-1.jpg';
import banner2 from '../../../assets/book-carousels/banner-2.jpeg';
import { Link } from "react-router-dom";

function Carousel({ slides }) {
    const [current, setCurrent] = useState(0);

    // Handle previous and next slide logic
    const previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    const nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    // Auto swap slides every 3 seconds (3000ms)
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [current]); // Effect depends on 'current' state to ensure interval runs after each slide change

    return (
        <div className="hidden lg:block overflow-hidden relative">
            <div
                className="flex transition ease-out duration-500"
                style={{
                    transform: `translateX(-${current * 100}%)`, // Slide transition
                }}
            >
                {slides.map((s, index) => {
                    return (
                        <div key={index} className="relative w-full flex-shrink-0">
                            <img
                                src={s}
                                alt={`slide-${index}`}
                                className="h-96 w-full object-cover" // Ensures one slide is shown at a time
                            />
                            {/* Text overlay */}
                            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
                                <p className="text-5xl text-black">Explore the
                                    <span className="text-6xl text-red-500"> e-Book</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Left and Right Arrow Buttons */}
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>


            {/* <Link className="h-full w-full text-white" to="/books">
                <button className="px-10 text-lg absolute top-2/3 left-60 font-semibold bg-fuchsia-600 border-none hover:bg-fuchsia-800 text-white btn">Explore Now</button>
            </Link> */}


            {/* Dot Indicators */}
            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(i);
                            }}
                            key={"circle" + i}
                            className={`rounded-full w-4 h-4 cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}

const slides = [
    banner1,
    banner2,
    banner1,
    banner1,
];

const Carousels = () => {
    return <Carousel slides={slides} />;
};

export default Carousels;
