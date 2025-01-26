import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import {
  FaConnectdevelop,
  FaUserFriends,
  FaChartLine,
  FaPeopleArrows,
  FaHandsHelping,
  FaRegSmileBeam,
} from 'react-icons/fa';

const HowKawanWorks = () => {
  const [steps, setSteps] = useState([]);
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    const fetchedSteps = [
      {
        id: 1,
        title: 'Step 1: Connect with Kawan',
        description:
          'Start your journey by connecting with Kawan. Share your concerns, and let us guide you towards mental well-being.',
        icon: <FaConnectdevelop className="text-blue-500 text-4xl" />,
      },
      {
        id: 2,
        title: 'Step 2: Personalized Support',
        description:
          'Kawan provides tailored advice and resources to help you through your mental health journey, based on your unique needs.',
        icon: <FaUserFriends className="text-green-500 text-4xl" />,
      },
      {
        id: 3,
        title: 'Step 3: Track Your Progress',
        description:
          'Monitor your progress with helpful tools, including mood trackers and goal setting, to help you stay on track.',
        icon: <FaChartLine className="text-purple-500 text-4xl" />,
      },
      {
        id: 4,
        title: 'Step 4: Join the Kawan Community',
        description:
          'Connect with others in the Kawan community who are going through similar experiences and share your journey together.',
        icon: <FaPeopleArrows className="text-orange-500 text-4xl" />,
      },
      {
        id: 5,
        title: 'Step 5: Ongoing Support',
        description:
          'Kawan is always here for you, offering ongoing support, motivation, and resources to help you thrive in your mental health journey.',
        icon: <FaHandsHelping className="text-red-500 text-4xl" />,
      },
      {
        id: 6,
        title: 'Step 6: Celebrate Your Success',
        description:
          'Reflect on your progress and celebrate milestones achieved during your journey with Kawan. Recognize your growth and keep moving forward.',
        icon: <FaRegSmileBeam className="text-yellow-500 text-4xl" />,
      },
    ];

    setSteps(fetchedSteps);
  }, []);

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-fuchsia-700">
        How Kawan Works
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        {steps.length > 0 ? (
          steps.map((step) => (
            <div
              key={step.id}
              className={`${
                theme === 'light' ? 'bg-white' : 'bg-gray-700'
              } p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105`}
            >
              <div className="mb-4 animate-bounce">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-fuchsia-700 mb-2">
                {step.title}
              </h3>
              <p
                className={`${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                } text-lg`}
              >
                {step.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No steps available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default HowKawanWorks;
