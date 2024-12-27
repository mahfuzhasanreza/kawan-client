import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ErrorPage = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (

        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Error | Kawan</title>
            </Helmet>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-7xl ">404</h1>
                    <p className="py-6">
                        Oops! This page was not found.
                    </p>
                    <button
                        onClick={goHome}
                        className="btn btn-primary bg-fuchsia-500 border-none hover:bg-fuchsia-200 mt-4"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
