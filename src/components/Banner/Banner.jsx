import Lottie from 'lottie-react';
import bannerLottieData from '../../assets/lottie/banner.json';
import { TypeAnimation } from 'react-type-animation';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const {userType, userDb} = useContext(AuthContext);
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
            <div className='hidden lg:block content-center mt-20 mx-auto z-10'>
                <p className='text-gray-300 font-mono text-md mb-5'>MENTAL HEALTH & SELF-DEVELOPMENT SUPPORT</p>
                <div className='flex'>
                    <h2 className='text-6xl font-bold text-white'>
                        Revitalize Your
                    </h2>
                    <h2 className='ml-3 text-6xl font-bold text-white'>
                        <TypeAnimation
                            sequence={[
                                'Mental Health',
                                2000,
                                'Personal Growth',
                                2000,
                            ]}
                            repeat={Infinity}
                        />
                    </h2>
                </div>
                <div className='content-center mx-auto z-10'>
                    <h2 className='mt-5 text-6xl font-bold text-white'>
                        with
                        <span className='border-b-4 border-fuchsia-600 ml-2 text-fuchsia-900 bg-yellow-500 rounded-tr-full rounded-bl-full px-10'>KAWAN</span>
                    </h2>
                </div>

                <p className='text-gray-300 text-lg mt-10 mb-24'>
                    Kawan is your trusted companion for mental health and self-development, designed

                    to empower individuals on their
                    <br /> journey to emotional well-being.
                </p>
                {
                    (userType === 'professional') && (
                        <Link to='/professional' className=''>
                            <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-5 py-2 rounded-lg font-bold btn btn-neutral">Professional Dashboard</button>
                        </Link>
                    )
                }
            </div>
            <div className='mx-auto w-1/2 lg:mx-none lg:w-1/3 z-10'>
                <Lottie animationData={bannerLottieData}></Lottie>
            </div>
        </div>
    );
};

export default Banner;
