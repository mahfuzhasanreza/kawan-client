import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "../Banner/Banner";
import HomeBtn from "../HomeBtn/HomeBtn";
import HomeContent from "../HomeContent/HomeContent";

const Home = () => {
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });


        const timer = setTimeout(() => {
            //         setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div>
            <Helmet>
                <title>Home | Kawan Admin</title>
            </Helmet>

            <div>
                <Banner></Banner>
            </div>


            <div className="">
                <HomeContent></HomeContent>
            </div>
           
        </div>
    );
};

export default Home;
