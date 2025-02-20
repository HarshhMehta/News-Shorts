import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    'general',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health'
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category: category,
            apiKey: import.meta.env.NEWS_API_KEY,
          },
        });
        setArticles(response.data.articles);
        setCurrentIndex(0);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop;
    const cardHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / cardHeight);
    
    if (newIndex !== currentIndex && newIndex < articles.length) {
      setCurrentIndex(newIndex);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <nav className="bg-white shadow-md py-2 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">News Shorts</h1>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar mt-2 sm:mt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition-colors
                    ${category === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      <main 
        className="flex-1 overflow-y-auto snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        {articles.map((article, index) => (
          <div key={index} className="snap-start h-[calc(100vh-3.5rem)]">
            <NewsCard 
              article={article} 
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </main>

      <div className="fixed bottom-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg z-10">
        <span className="text-sm font-medium text-blue-600">
          {currentIndex + 1} / {articles.length}
        </span>
      </div>
    </div>
  );
}

export default App;
