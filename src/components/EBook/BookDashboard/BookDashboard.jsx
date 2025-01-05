import { Helmet } from "react-helmet-async";
import Carousels from "./Carousels";
import AllBooks from "../AllBooks/AllBooks";

const BookDashboard = () => {
    return (
        <>
            <Helmet>
                <title>e-Book | Kawan</title>
            </Helmet>
            <header>
                <Carousels></Carousels>
            </header>
            <main>
                <AllBooks></AllBooks>
            </main>
        </>
    );
};

export default BookDashboard;