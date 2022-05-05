import React from 'react';
import styled from 'styled-components';

const Slider = ({currentIndex}) => {

  return (
    <svg viewBox = '0 0 104 9' width = '340px'>
      <defs>
        <linearGradient id="rectangle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset = {`${currentIndex * 25}%`} stopColor = "rgb(0, 191, 255)"></stop>
          <stop offset = {`${currentIndex * 25}%`} stopColor = "rgb(166, 233, 255)"></stop>
        </linearGradient>
      </defs>
      <rect fill = 'url(#rectangle-gradient)' x = '2' y = '4' width = '100' height = '1'/>
      <circle cx = '2' cy = '4.5' r = '1.5' fill = { currentIndex >= 0 ? "rgb(0, 191, 255)" : "rgb(166, 233, 255)"}/>
      <circle cx = '27' cy = '4.5' r = '1.5' fill = { currentIndex >= 1 ? "rgb(0, 191, 255)" : "rgb(166, 233, 255)"}/>
      <circle cx = '52' cy = '4.5' r = '1.5' fill = { currentIndex >= 2 ? "rgb(0, 191, 255)" : "rgb(166, 233, 255)"}/>
      <circle cx = '77' cy = '4.5' r = '1.5' fill = { currentIndex >= 3 ? "rgb(0, 191, 255)" : "rgb(166, 233, 255)"}/>
      <circle cx = '102' cy = '4.5' r = '1.5' fill = { currentIndex >= 4 ? "rgb(0, 191, 255)" : "rgb(166, 233, 255)"}/>
    </svg>
  );
};

export default Slider;