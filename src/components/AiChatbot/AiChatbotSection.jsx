import React from 'react';

const AiChatbotSection = () => {
    return (
        <section className="bg-base-200 py-16 px-8 lg:px-32">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-fuchsia-600 mb-8">AI Chatbot: Your Ultimate Companion for Support</h2>
                <p className="text-lg text-gray-700 leading-8">
                    Kawan is dedicated to empowering your mental well-being in today’s fast-paced world. Our AI-powered chatbot serves as a compassionate and understanding companion, available 24/7 to support your mental health journey. Whether you need guidance, a listening ear, or tailored self-help resources, our chatbot is here to ensure you never feel alone on the path to a healthier mind.
                </p>

            </div>
            <div className="mt-12 mx-auto content-center items-center flex flex-col justify-center">
                <ul className="mx-auto w-fit space-y-4 text-left text-gray-700">
                    <li className="flex items-start space-x-3">
                        <span className="material-symbols-rounded text-fuchsia-600 text-2xl">chat</span>
                        <span>Engage in meaningful and personalized conversations tailored to your emotional needs.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="material-symbols-rounded text-fuchsia-600 text-2xl">self_improvement</span>
                        <span>Access guided exercises and mindfulness practices to promote inner peace and focus.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="material-symbols-rounded text-fuchsia-600 text-2xl">psychology</span>
                        <span>Get actionable insights and strategies for managing stress, anxiety, and other challenges.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="material-symbols-rounded text-fuchsia-600 text-2xl">support_agent</span>
                        <span>Receive recommendations for professional resources when additional help is needed.</span>
                    </li>
                </ul>
                <button className="mt-10 px-8 py-3 text-white bg-fuchsia-600 rounded-lg hover:bg-fuchsia-700 transition duration-300">
                    Try the Chatbot Now
                </button>
            </div>
        </section>
    );
};

export default AiChatbotSection;
