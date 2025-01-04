import { Helmet } from "react-helmet-async";
import Carousels from "./Carousels";

const BookDashboard = () => {
    return (
        <>
            <Helmet>
                <title>e-Book | Kawan</title>
            </Helmet>
            <header>
                <Carousels></Carousels>
            </header>
        </>
    );
};

export default BookDashboard;