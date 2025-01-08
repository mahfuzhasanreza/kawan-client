import React from "react";
import bannerImg from '../../assets/health-and-nutrition/banner.jpeg'
import bannerLottieData from '../../assets/lottie/health-and-nutrition/banner.json';
import Lottie from "lottie-react";

const Banner = () => {
    return (
        <>
            <div className="relative bg-gradient-to-r from-green-500 to-blue-600 text-white h-64 flex items-center justify-center shadow-lg overflow-hidden">
                {/* Background Image (optional) */}
                <div className="absolute inset-0 opacity-20">
                    <img
                        src={bannerImg}
                        alt="Health and Nutrition"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">
                        Health & Nutrition Tracker
                    </h1>
                    <p className="text-lg">
                        Take charge of your health with personalized insights and
                        tools.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition">
                        Get Started
                    </button>
                </div>

                {/* <div className="">
                    <Lottie animationData={bannerLottieData} />
                </div> */}
            </div>

        </>
    );
};

export default Banner;
