
const KawanNewsAndUpdates = () => {
  const newsAndUpdates = [
    {
      title: 'Breaking the Stigma: Mental Health Awareness in 2024',
      date: 'December 20, 2024',
      excerpt: 'Mental health awareness continues to grow in 2024, with more people seeking support and breaking free from the stigma. Learn about the latest trends and resources for mental well-being.',
    },
    {
      title: 'How Kawan Is Helping Individuals Overcome Anxiety and Stress',
      date: 'December 15, 2024',
      excerpt: 'Kawan offers personalized support to help individuals manage anxiety and stress through expert guidance, tools, and a compassionate community.',
    },
    {
      title: 'Self-Care Tips: Nurturing Your Mental Health During Busy Times',
      date: 'December 10, 2024',
      excerpt: 'Life can be overwhelming, but self-care is key to maintaining good mental health. Discover simple yet effective tips to nurture yourself during stressful times.',
    },
    {
      title: 'The Power of Support Groups: How Kawan Builds Community Connections',
      date: 'December 5, 2024',
      excerpt: 'Kawan brings people together through support groups, fostering connections between those who share similar experiences and offering a safe space for healing.',
    },
    {
      title: 'Navigating Your Mental Health Journey with Kawan',
      date: 'December 1, 2024',
      excerpt: 'Kawan helps individuals navigate their mental health journey, offering tools, expert advice, and continuous support to ensure personal growth and resilience.',
    },
    {
      title: 'The Role of Technology in Mental Health: How Kawan Is Innovating',
      date: 'November 28, 2024',
      excerpt: 'Technology is playing an increasing role in mental health. Kawan leverages innovative tools to connect individuals with personalized support and resources for better well-being.',
    },
  ];

  return (
    <section className="container mx-auto p-5 my-16">
      <h2 className="text-4xl font-bold text-fuchsia-700 text-center mx-8 mb-16">Kawan News & Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsAndUpdates.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-fuchsia-700">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{item.date}</p>
            <p className="text-gray-800 mb-4">{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KawanNewsAndUpdates;
