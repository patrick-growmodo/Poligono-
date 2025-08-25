'use client';

import React from 'react';

interface OverlayCard {
  id: string;
  text: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
}

interface VideoOverlayProps {
  videoSrc?: string;
  imageSrc?: string;
  overlayCards: OverlayCard[];
  width?: number;
  height?: number;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ 
  videoSrc, 
  imageSrc, 
  overlayCards, 
  width = 400, 
  height = 400 
}) => {
  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center-left':
        return 'top-1/2 left-4 transform -translate-y-1/2';
      case 'center-right':
        return 'top-1/2 right-4 transform -translate-y-1/2';
      default:
        return 'top-4 left-4';
    }
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* Video or Image Background */}
      {videoSrc ? (
        <video
          className=""
          autoPlay
          style={{ width: '100%', height: '100%' }}
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        <div 
          className="w-full h-full bg-cover bg-center rounded-[20px]"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#6940E4] to-[#DA46F8] rounded-[20px] flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/40 rounded-full"></div>
            </div>
            <p className="text-sm opacity-80">Video Placeholder</p>
          </div>
        </div>
      )}

      {/* Overlay Cards */}
      {overlayCards.map((card) => (
        <div
          key={card.id}
          className={`absolute ${getPositionClasses(card.position)} z-10`}
        >
          <div className="bg-black/80 text-white px-4 py-2 rounded-[8px] text-sm font-inter whitespace-nowrap backdrop-blur-sm">
            {card.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoOverlay; 