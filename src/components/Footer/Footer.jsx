import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../../assets/kawanLogoMsg.png';


const Footer = () => {
    return (
        <footer className="bg-gray-100">
            {/* Footer Heading Section */}
            <div className="pb-16 pt-10 footer footer-center p-10">
                <aside>
                    <p className="text-4xl font-bold text-purple-700 pb-4">
                        <img className="w-60" src={logo} alt="" />
                    </p>
                    <p className="text-xl w-2/3 mt-2 text-gray-500">
                    KAWAN is dedicated to provide a safe space for individuals to manage their mental health, offering resources, tools, and community support to promote emotional growth and balance.
                    </p>
                </aside>
            </div>

            <div className="border-t-2 w-5/6 mx-auto border-gray-300"></div>

            {/* Footer Links Section */}
            <div className="pb-12 footer text-base-content p-10 justify-between px-64 items-center">
                {/* Services Links */}
                <nav className="items-center flex flex-col text-gray-500">
                    <h6 className="font-bold text-xl pb-3 text-purple-700">SERVICES</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>

                {/* Company Links */}
                <nav className="items-center flex flex-col text-gray-500">
                    <h6 className="font-bold text-xl pb-3 text-purple-700">COMPANY</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>

                {/* Social Media Links */}
                <div className="items-center flex flex-col lg:mx-0 mx-auto">
                    <h6 className="font-bold text-xl pb-3 text-purple-700">Follow Us</h6>
                    <div className="flex gap-20 lg:gap-5">
                        <a href="https://www.facebook.com/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-blue-600 text-xl">
                            <FaFacebookF />
                        </a>

                        <a href="https://www.instagram.com/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-orange-700 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/mahfuzhasanreza/" target="_blank" rel="noopener noreferrer" className="text-purple-700 text-xl hover:text-blue-400">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="py-4 bg-purple-600 text-gray-200 text-center">
                <p className="md:text-base text-sm">© {new Date().getFullYear()} KAWAN. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
