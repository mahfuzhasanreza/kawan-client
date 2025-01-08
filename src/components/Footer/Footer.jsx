import { useContext } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const Footer = () => {
    const { theme } = useContext(AuthContext);

    return (
        <footer className={`${(theme === "dark") ? 'max-w-[5000px] mx-auto bg-black z-50' : 'z-50 max-w-[5000px] mx-auto bg-fuchsia-100'}`}>
            {/* Footer Links Section */}
            <div className="pb-12 footer text-base-content p-10 pt-16 justify-evenly">
                {/* Explore Links */}
                <nav className="items-center flex flex-col">
                    <h6 className=" text-xl pb-3 text-fuchsia-700 font-semibold">Kawan</h6>
                    <p className="text-center text-gray-600">Unlock the power of growth with Kawan! Let’s build a community that thrives on support, positivity, and personal transformation.</p>
                </nav>

                {/* Contact Information */}
                <div className="items-center flex flex-col lg:mx-0 mx-auto">
                    <h6 className=" text-xl pb-3 text-fuchsia-700 font-semibold">Contact Us</h6>
                    <div className="text-center text-gray-600">
                        <p>Email: <a href="mailto:support@Kawan.com" className="text-fuchsia-700">support@Kawan.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="text-fuchsia-700">+88 01770-452285</a></p>
                        <p>Address: 123 Kawan Blvd, Dhaka, Bangladesh</p>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="items-center flex flex-col lg:mx-0 mx-auto my-auto">
                    <h6 className=" text-xl pb-3 text-fuchsia-700 font-semibold">Follow Us</h6>
                    <div className="flex gap-20 lg:gap-5">
                        <a href="https://www.facebook.com/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-fuchsia-700 text-xl">
                            <FaFacebookF />
                        </a>
                        <a href="https://www.instagram.com/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-fuchsia-700 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-fuchsia-700 text-xl">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="py-4 bg-fuchsia-700 text-white text-center">
                <p className="md:text-base text-sm">© {new Date().getFullYear()} Kawan. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
