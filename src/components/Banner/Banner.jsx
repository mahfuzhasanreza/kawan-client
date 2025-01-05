import Lottie from 'lottie-react';
import bannerLottieData from '../../assets/lottie/banner.json'

const Banner = () => {
    return (
        <div
            className='flex justify-between bg-cover bg-center opacity-80 shadow-lg h-1/2'
            style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.6)), rgba(0, 0, 0, 0.6), url('https://i.ibb.co/Wn8KZ23/banner-Bg3.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <div className='absolute inset-0'></div>
            <div className='content-center mx-auto z-10'>
                <p className='text-gray-200 text-lg mb-3'>Mental Health Support</p>
                <h2 className='text-6xl font-bold text-white'>Revitalize Your

                    Mental Health <br />
                    <div className='mt-5'>
                        with
                        <span className='ml-2 text-yellow-500 bg-black rounded-tr-full rounded-bl-full px-10'>KAWAN</span>
                    </div>
                </h2>
                <p className='text-gray-200 mt-7 mb-24'>
                    Ornare ultrices ultricies suscipit aliquam arcu ipsum dictum. Consectetur amet inceptos
                   
                    vitae si est sapien magna morbi torquent.
                </p>
            </div>
            <div className='w-1/3 z-10'>
                <Lottie animationData={bannerLottieData}></Lottie>
            </div>
        </div>

    );
};

export default Banner;