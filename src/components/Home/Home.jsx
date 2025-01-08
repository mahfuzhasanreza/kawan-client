import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import HowKawanWorks from "../HowKawanWorks/HowKawanWorks";
import FAQSection from "../FAQSecton/FAQSection";
import { ColorRing } from "react-loader-spinner"; // Ensure this package is installed
import KawanNewsAndUpdates from "../KawanNewsAndUpdates/KawanNewsAndUpdates";
import CommunityStories from "../CommunityStories/CommunityStories";
import WhyChooseKawan from "../WhyChooseKawan/WhyChooseKawan";
import Banner from "../Banner/Banner";

const Home = () => {
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     AOS.init({
    //         duration: 1000,
    //         once: true,
    //     });


    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);

    //     return () => clearTimeout(timer);
    // }, []);

    // if (loading) {
    //     return (
    //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50">
    //             <ColorRing
    //                 visible={true}
    //                 height="80"
    //                 width="80"
    //                 ariaLabel="color-ring-loading"
    //                 wrapperStyle={{}}
    //                 wrapperClass="color-ring-wrapper"
    //                 colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    //             />
    //         </div>
    //     );
    // }

    return (
        <div>
            <Helmet>
                <title>Home | Kawan</title>
            </Helmet>

            <div>
                <Banner></Banner>
            </div>

            <div data-aos="fade-down">
                <KawanNewsAndUpdates></KawanNewsAndUpdates>
            </div>


            <div data-aos="fade-up">
                <CommunityStories></CommunityStories>
            </div>

            <div data-aos="fade-down">
                <HowKawanWorks></HowKawanWorks>
            </div>

            <div data-aos="fade-up">
                <WhyChooseKawan></WhyChooseKawan>
            </div>
        
            <div data-aos="fade-down">
                <FAQSection></FAQSection>
            </div>

        </div>
    );
};

export default Home;
