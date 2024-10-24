import React from 'react';
interface CameraHealthProps {
  imageUrl: string;
  label: string;
}

export const CameraHealth: React.FC<CameraHealthProps> = ({ imageUrl, label }) => {
  return (
    <article className="camera-health">
      <div className="camera-health-container">
        <img 
          loading="lazy" 
          src={imageUrl} 
          className="camera-health-image" 
          alt="Camera health status indicator"
        />
        <span className="camera-health-label">{label}</span>
      </div>
    </article>
  );
};