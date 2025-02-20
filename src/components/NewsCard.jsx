import React from 'react';
const NewsCard = ({ article, isActive }) => {
    return (
      <div className={`h-full flex items-center justify-center p-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
        <div className="max-w-xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-48 sm:h-72">
            <img 
              className="absolute inset-0 w-full h-full object-cover"
              src={article.urlToImage || 'https://via.placeholder.com/400'} 
              alt={article.title}
              loading="lazy"
            />
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {article.source.name}
              </span>
              <span className="text-gray-500 text-xs">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
              {article.description}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                Read full story
              </a>
              {article.author && (
                <span className="text-xs text-gray-500 truncate ml-2">
                  By {article.author}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewsCard;