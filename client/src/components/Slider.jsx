import React from 'react';
import PropTypes from 'prop-types';

Slider.propTypes = {
  currentIndex: PropTypes.number,
};

Slider.defaultProps = {
  currentIndex: 0,
};

function Slider({ currentIndex }) {
  return (
    <svg viewBox="0 0 106 9" width="340px">
      <defs>
        <linearGradient id="rectangle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${currentIndex * 25}%`} stopColor="rgb(0, 191, 255)" />
          <stop offset={`${currentIndex * 25}%`} stopColor="rgb(166, 233, 255)" />
        </linearGradient>
      </defs>
      <rect fill="url(#rectangle-gradient)" x="2" y="4" width="100" height="1" />
      <circle cx="3" cy="4.5" r={currentIndex === 0 ? '2.5' : '1.5'} fill={currentIndex >= 0 ? 'rgb(0, 191, 255)' : 'rgb(166, 233, 255)'} />
      <circle cx="28" cy="4.5" r={currentIndex === 1 ? '2.5' : '1.5'} fill={currentIndex >= 1 ? 'rgb(0, 191, 255)' : 'rgb(166, 233, 255)'} />
      <circle cx="53" cy="4.5" r={currentIndex === 2 ? '2.5' : '1.5'} fill={currentIndex >= 2 ? 'rgb(0, 191, 255)' : 'rgb(166, 233, 255)'} />
      <circle cx="78" cy="4.5" r={currentIndex === 3 ? '2.5' : '1.5'} fill={currentIndex >= 3 ? 'rgb(0, 191, 255)' : 'rgb(166, 233, 255)'} />
      <circle cx="103" cy="4.5" r={currentIndex === 4 ? '2.5' : '1.5'} fill={currentIndex >= 4 ? 'rgb(0, 191, 255)' : 'rgb(166, 233, 255)'} />
    </svg>
  );
}

export default Slider;
