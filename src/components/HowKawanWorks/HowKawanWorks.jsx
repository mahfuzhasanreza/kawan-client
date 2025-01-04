import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const HowKawanWorks = () => {
  const [steps, setSteps] = useState([]);
  const { theme } = useContext(AuthContext);

  // Sample steps data, replace with your actual data or adjust as needed
  useEffect(() => {
    // Simulate fetching steps from an API or database
    const fetchedSteps = [
      {
        id: 1,
        title: 'Step 1: Connect with Kawan',
        description: 'Start your journey by connecting with Kawan. Share your concerns, and let us guide you towards mental well-being.',
      },
      {
        id: 2,
        title: 'Step 2: Personalized Support',
        description: 'Kawan provides tailored advice and resources to help you through your mental health journey, based on your unique needs.',
      },
      {
        id: 3,
        title: 'Step 3: Track Your Progress',
        description: 'Monitor your progress with helpful tools, including mood trackers and goal setting, to help you stay on track.',
      },
      {
        id: 4,
        title: 'Step 4: Join the Kawan Community',
        description: 'Connect with others in the Kawan community who are going through similar experiences and share your journey together.',
      },
      {
        id: 5,
        title: 'Step 5: Ongoing Support',
        description: 'Kawan is always here for you, offering ongoing support, motivation, and resources to help you thrive in your mental health journey.',
      },
    ];

    setSteps(fetchedSteps);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-4xl font-bold text-center text-fuchsia-700">How Kawan Works</h2>
      <div className="space-y-5 my-16">
        {steps.length > 0 ? (
          steps.map((step) => (
            <div key={step.id} className={theme === "light" ? 'bg-white p-6 rounded-lg shadow-md' : 'p-6 rounded-lg shadow-md bg-gray-700'}>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="text-lg text-gray-700">{step.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No steps available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default HowKawanWorks;
