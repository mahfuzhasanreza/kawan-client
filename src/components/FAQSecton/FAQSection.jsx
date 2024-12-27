import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const FAQSection = () => {
  // State to handle the visibility of answers
  const [activeIndex, setActiveIndex] = useState(null);
  const { theme } = useContext(AuthContext);



  const faqs = [
    {
      question: "What is Kawan?",
      answer: "Kawan is a mental health and self-development platform designed to provide resources, tools, and support for individuals to enhance their well-being and achieve personal growth.",
    },
    {
      question: "How can I access self-development resources on Kawan?",
      answer: "Simply log in to your account, navigate to the 'Resources' section, and explore a wide range of articles, e-books, videos, and tools focused on mental health and self-improvement.",
    },
    {
      question: "Can I track my progress on Kawan?",
      answer: "Yes, Kawan allows you to track your progress through personalized dashboards. You can set goals, monitor milestones, and receive insights on your journey to self-development.",
    },
    {
      question: "Is there a limit to how many resources I can access?",
      answer: "No, there’s no limit to accessing resources. You are free to explore and use as many tools and materials as you need for your personal growth.",
    },
    {
      question: "Can I get professional help through Kawan?",
      answer: "Yes, Kawan connects you with licensed mental health professionals for consultations and therapy sessions. You can book appointments directly through the platform.",
    },
    {
      question: "What should I do if I encounter issues on Kawan?",
      answer: "If you experience any issues, you can contact our support team through the 'Help & Support' section, and we’ll address your concerns promptly.",
    },
    {
      question: "Is Kawan free to use?",
      answer: "Kawan offers a range of free resources to support mental health and self-development. Premium features, such as advanced tools or professional consultations, may involve a fee.",
    },
  ];


  // Toggle answer visibility
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // console.log(theme);
  return (

    <div className={`${(theme === 'dark') ? 'faq-section py-16' : 'faq-section py-16 bg-gray-100'}`}>
      <h2 className="text-4xl text-center  text-fuchsia-700 mb-10 font-semibold">Frequently Asked Questions</h2>

      <div className="mx-4 faq-container max-w-4xl lg:mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className={theme === "light" ? " faq-item bg-white p-6 rounded-lg shadow-md" : 'faq-item  p-6 rounded-lg shadow-md bg-gray-700'}>
            <div
              className="faq-question flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className={theme === "light" ? 'text-xl font-semibold text-gray-800' : 'text-gray-400 text-xl font-semibold '}>{faq.question}</h3>
              <span className="text-gray-500">{activeIndex === index ? '-' : '+'}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer mt-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
