import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import UpcomingEvents from "../HowKawanWorks/HowKawanWorks";
import FAQSection from "../FAQSecton/FAQSection";
import { ColorRing } from "react-loader-spinner"; // Ensure this package is installed
import FoodNewsAndBlogs from "../FoodNewsAndBlogs/FoodNewsAndBlogs";
import CommunityStories from "../CommunityStories/CommunityStories";
import BookRead from "../EBook/BookRead/BookRead";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });


        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Home | Kawan</title>
            </Helmet>

            <div data-aos="fade-down">
                <CommunityStories></CommunityStories>
            </div>

            <div data-aos="fade-up">
                <UpcomingEvents></UpcomingEvents>
            </div>

            <div data-aos="fade-down">
                <FoodNewsAndBlogs></FoodNewsAndBlogs>
            </div>
            <div data-aos="fade-up">
                <FAQSection></FAQSection>
            </div>

        </div>
    );
};

export default Home;
