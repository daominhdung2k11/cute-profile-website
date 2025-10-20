import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const VideoGallery = ({ videos }) => {
  const { language } = useLanguage();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-video bg-gray-100">
              <iframe
                src={video.url}
                title={video.title[language]}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-[var(--theme-text)] font-semibold text-center">
                {video.title[language]}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;