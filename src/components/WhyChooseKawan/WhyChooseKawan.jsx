import chatbotImg from '../../assets/why-choose-kawan/kawanChatbot.png';
import personalSelfDevImg from '../../assets/why-choose-kawan/personalSelfDev.png';
import mentalHealthImg from '../../assets/why-choose-kawan/mentalHealth.png';
import communityEngagementImg from '../../assets/why-choose-kawan/communityEngagement.png';
import confidentialImg from '../../assets/why-choose-kawan/confidential.png';
import progressImg from '../../assets/why-choose-kawan/progress.png';

const WhyChooseKawan = () => {
    return (
        <div className="mb-20 bg-base-200 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl lg:text-5xl text-fuchsia-700 font-bold">Why Choose Kawan?</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Empower your mental health and personal growth journey with Kawan, your trusted companion.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <img
                            src={chatbotImg}
                            alt="Kawan Chatbot"
                            className="w-fit h-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-fuchsia-700">AI-Powered Chatbot</h3>
                        <p className="mt-2 text-gray-600">
                            Engage in meaningful conversations with Kawan's empathetic AI chatbot, designed to listen, guide, and support you.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <img
                            src={personalSelfDevImg}
                            alt="Personalized Self-Development"
                            className="w-fit h-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-fuchsia-700">Personalized Self-Development</h3>
                        <p className="mt-2 text-gray-600">
                            Access resources like e-books, meditation guides, and custom-tailored tools to enrich your growth journey.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <img
                            src={mentalHealthImg}
                            alt="Mental Health Support"
                            className="w-fit h-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-fuchsia-700">Mental Health Support</h3>
                        <p className="mt-2 text-gray-600">
                            Find peace and clarity through meditation, journaling, and other tools designed to nurture your mental well-being.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <img
                            src={communityEngagementImg}
                            alt="Community Engagement"
                            className="w-fit h-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-fuchsia-700">Community Engagement</h3>
                        <p className="mt-2 text-gray-600">
                            Connect with a supportive community of individuals sharing similar experiences, fostering growth and understanding.
                        </p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <img
                            src={progressImg}
                            alt="Progress Tracking Tools"
                            className="w-fit h-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-fuchsia-700">Progress Tracking Tools</h3>
                        <p className="mt-2 text-gray-600">
                            Monitor your journey with intuitive dashboards and analytics that highlight your growth and milestones.
                        </p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <img
                            src={confidentialImg}
                            alt="Secure & Confidential"
                            className="w-fit h-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-fuchsia-700">Secure & Confidential</h3>
                        <p className="mt-2 text-gray-600">
                            Your privacy is our priority. Kawan ensures secure interactions and protects your personal data at every step.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseKawan;
