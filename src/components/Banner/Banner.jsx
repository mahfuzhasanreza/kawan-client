import Lottie from 'lottie-react';
import bannerLottieData from '../../assets/lottie/banner.json';
import { TypeAnimation } from 'react-type-animation';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import bannerBg from '../../assets/banner/bannerBg3.jpg';

const primaryBtn =
    'inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-400';
const secondaryBtn =
    'inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-fuchsia-700';

const Banner = () => {
    const { user, userDb } = useContext(AuthContext);
    const [isProfessional, setIsProfessional] = useState(false);

    // status 1 (unverified) and 2 (verified) are professionals; 0 / 404 is a regular user.
    useEffect(() => {
        if (!userDb?.email) {
            setIsProfessional(false);
            return;
        }
        const controller = new AbortController();
        fetch(`${SERVER_URL}/professionals/${userDb.email}`, { signal: controller.signal })
            .then((res) => res.json())
            .then((data) => setIsProfessional(data?.status === 1 || data?.status === 2))
            .catch(() => { });
        return () => controller.abort();
    }, [userDb?.email]);

    return (
        <section className="relative overflow-hidden shadow-lg">
            {/* Background on its own layer so the 80% opacity doesn't fade the text */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${bannerBg})`,
                }}
            />
            <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 lg:grid-cols-2 lg:px-8 lg:py-16">
                {/* Text */}
                <div className="text-center lg:text-left">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-300 sm:text-sm">
                        Mental health &amp; self-development support
                    </p>

                    <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                        Revitalize Your
                        <span className="block min-h-[1.25em] whitespace-nowrap text-yellow-300">
                            <TypeAnimation
                                sequence={['Mental Health', 2000, 'Personal Growth', 2000]}
                                repeat={Infinity}
                            />
                        </span>
                        <span className="mt-2 inline-block">
                            with{' '}
                            <span className="ml-1 inline-block rounded-bl-full rounded-tr-full border-b-4 border-fuchsia-600 bg-yellow-400 px-6 text-fuchsia-900 sm:px-10">
                                KAWAN
                            </span>
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg lg:mx-0">
                        Kawan is your trusted companion for mental health and self-development, designed to
                        empower individuals on their journey to emotional well-being.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                        {isProfessional ? (
                            <Link to="/professional-dashboard" className={primaryBtn}>Professional Dashboard</Link>
                        ) : user ? (
                            <Link to="/meditation" className={primaryBtn}>Start Meditating</Link>
                        ) : (
                            <Link to="/register" className={primaryBtn}>Get Started</Link>
                        )}
                        <Link to="/professional-support" className={secondaryBtn}>Professional Support</Link>
                    </div>
                </div>

                {/* Illustration */}
                <div className="mx-auto w-full max-w-sm sm:max-w-md lg:mr-0 lg:max-w-lg lg:justify-self-end xl:-mr-8">
                    <Lottie animationData={bannerLottieData} loop aria-hidden="true" />
                </div>
            </div>
        </section>
    );
};

export default Banner;
