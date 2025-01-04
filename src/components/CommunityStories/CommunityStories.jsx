import React from 'react';
import female from '../../assets/community-stories/female.jpg'
import female2 from '../../assets/community-stories/1.png'
import male from '../../assets/community-stories/male.jpeg'

const CommunityStories = () => {
  const stories = [
    {
      name: "Amina Rahman",
      story: "KAWAN helped me find emotional support during a challenging period in my life. The personalized advice and resources helped me feel heard and understood.",
      image: female,
    },
    {
      name: "Zahid Hasan",
      story: "Using KAWAN, I discovered valuable self-help tools that allowed me to improve my mental well-being. It's a supportive and empowering platform.",
      image: male,
    },
    {
      name: "Raisa Begum",
      story: "KAWAN was my companion when I needed guidance. The mental health tips and community support gave me the confidence to overcome personal struggles.",
      image: female2,
    },
  ];  

  return (
    <section className="mx-5 rounded-lg py-16 bg-gray-50" id="community-stories">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-fuchsia-700">Heartwarming Stories</h2>
        <p className="text-lg text-gray-600 mb-10">
          Hear from our amazing community members who are making a difference!
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{story.name}</h3>
                <p className="text-gray-600 mt-4">{story.story}</p>
              </div>
            </div>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default CommunityStories;
