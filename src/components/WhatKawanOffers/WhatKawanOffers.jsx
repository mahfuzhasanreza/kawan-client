import { FaRobot, FaGamepad, FaBook, FaSpa, FaPenFancy, FaAppleAlt, FaUserMd } from "react-icons/fa";

const WhatKawanOffers = () => {
    const offerings = [
        { id: 1, title: "AI Chatbot", description: "Your virtual companion for mental health support.", icon: <FaRobot className="text-4xl text-purple-500" /> },
        { id: 2, title: "Games", description: "Interactive and engaging mental wellness games.", icon: <FaGamepad className="text-4xl text-red-500" /> },
        { id: 3, title: "E-Books", description: "Access a library of insightful self-help books.", icon: <FaBook className="text-4xl text-blue-500" /> },
        { id: 4, title: "Meditation", description: "Guided meditation sessions for relaxation.", icon: <FaSpa className="text-4xl text-green-500" /> },
        { id: 5, title: "Journaling", description: "Track your progress with our journaling tools.", icon: <FaPenFancy className="text-4xl text-yellow-500" /> },
        { id: 6, title: "Health & Nutrition", description: "Expert tips on maintaining a healthy lifestyle.", icon: <FaAppleAlt className="text-4xl text-orange-500" /> },
        { id: 7, title: "Live Counseling", description: "Connect with professionals for live sessions.", icon: <FaUserMd className="text-4xl text-teal-500" /> },
    ];

    return (
        <div className="py-36 relative overflow-hidden bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-fuchsia-700 mb-2">What Kawan Offers</h2>
                <p className="mb-10 text-sm text-gray-500">
                    Kawan is your trusted partner in self-development and mental health.
                </p>

                {/* Scrolling Container */}
                <div className="relative overflow-hidden">
                    <div className="flex space-x-6 animate-scroll items-center">
                        {offerings.concat(offerings).map((offer, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 bg-white rounded-xl p-6 text-center w-60 hover:scale-105 hover:bg-fuchsia-50 hover:shadow-2xl transition-transform duration-300"
                            >
                                <div>
                                    <div className="flex justify-center items-center mb-4 hover:rotate-12 transition-transform duration-500">
                                        {offer.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-fuchsia-700">{offer.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{offer.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style>{`
        .animate-scroll {
          animation: scroll 5s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    );
};

export default WhatKawanOffers;
