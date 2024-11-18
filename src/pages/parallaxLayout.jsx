// ParallaxLayout.jsx - 순수 컴포넌트
import React from 'react';

const ParallaxLayout = ({ backgroundImage, heroTitle }) => {
  return (
    <div className="parallax-hero">
      <section className="hero-section">
        <div className="hero-image-container">
          <img 
            src={backgroundImage} 
            alt="배경" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>{heroTitle}</h1>
        </div>
      </section>
    </div>
  );
};

export default ParallaxLayout;