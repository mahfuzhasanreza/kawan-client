import Lottie from 'lottie-react';
import bannerLottieData from '../../assets/lottie/banner.json';

const Banner = () => {
    return (
        <div
            className='flex justify-between bg-cover bg-center opacity-80 shadow-lg h-1/2'
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url('https://i.ibb.co/Wn8KZ23/banner-Bg3.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <div className='content-center mx-auto z-10'>
                <p className='text-gray-400 text-md mb-3'>Mental Health Support</p>
                <h2 className='text-6xl font-bold text-white'>
                    Revitalize Your Mental Health <br />
                    <div className='mt-5'>
                        with
                        <span className='ml-2 text-purple-900 bg-yellow-500 rounded-tr-full rounded-bl-full px-10'>KAWAN</span>
                    </div>
                </h2>
                <p className='text-gray-400 text-lg mt-7 mb-24'>
                Kawan is your trusted companion for mental health and self-development, designed 
        
                to empower individuals on their
                <br /> journey to emotional well-being.
                </p>
            </div>
            <div className='w-1/3 z-10'>
                <Lottie animationData={bannerLottieData}></Lottie>
            </div>
        </div>
    );
};

export default Banner;
