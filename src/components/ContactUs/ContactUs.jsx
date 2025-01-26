import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("There was an error sending the message.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-white text-gray-800 py-16 px-6">
            <Helmet>
                <title>Contact Us | Kawan</title>
            </Helmet>
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl text-fuchsia-600 font-bold mt-2 mb-4 text-center">Contact Us</h2>
                <p className="text-lg text-gray-600 mb-12">
                    We're here to help! Reach out for any inquiries or support.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {/* Phone Section */}
                    <div
                        className={`pb-5 transition-all duration-300 transform ${isHovered ? "scale-105 shadow-xl shadow-purple-300" : "scale-100"}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <a href="tel:+1234567890">
                            <div className="flex items-center justify-center mb-4 p-6 bg-blue-500 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-xl shadow-purple-300 transition-all">
                                <FaPhoneAlt className="text-4xl" />
                            </div>
                        </a>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                        <p className="text-gray-600"><a className="hover:text-blue-500" href="tel:+1234567890">+88 01770-452285</a></p>
                    </div>

                    {/* Email Section */}
                    <div
                        className={`transition-all duration-300 transform ${isHovered ? "scale-105 shadow-xl shadow-purple-300" : "scale-100"}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <a href="mailto:support@Kawan.com">
                            <div className="flex items-center justify-center mb-4 p-6 bg-green-500 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-xl shadow-purple-300 transition-all">
                                <FaEnvelope className="text-4xl" />
                            </div>
                        </a>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                        <p className="text-gray-600">
                            <a href="mailto:support@Kawan.com" className="hover:text-blue-500">support@kawan.com</a>
                        </p>
                    </div>

                    {/* Location Section */}
                    <div
                        className={`transition-all duration-300 transform ${isHovered ? "scale-105 shadow-xl shadow-purple-300" : "scale-100"}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex items-center justify-center mb-4 p-6 bg-purple-500 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-xl shadow-purple-300 transition-all">
                            <FaMapMarkerAlt className="text-4xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Location</h3>
                        <p className="text-gray-600">Gulshan-2, Dhaka-1212</p>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="container px-4 mx-auto">
                        <div className="mx-auto">
                            <div className="max-w-4xl text-start mx-auto px-8 py-8 bg-gray-100 rounded-lg shadow-lg">
                                <h2 className="text-5xl text-fuchsia-600 font-bold mt-2 mb-10 text-center">Get in Touch</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label className="block text-lg text-gray-800 mb-2" htmlFor="name">Your Name</label>
                                        <input
                                            className="w-full px-6 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 text-gray-800"
                                            placeholder="Enter your name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-lg text-gray-800 mb-2" htmlFor="email">Your Email</label>
                                        <input
                                            className="w-full px-6 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 text-gray-800"
                                            placeholder="Enter your email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-lg text-gray-800 mb-2" htmlFor="message">Your Message</label>
                                        <textarea
                                            className="w-full px-6 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 text-gray-800"
                                            rows="5"
                                            placeholder="Enter your message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        className={`w-full bg-yellow-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-yellow-400 transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
