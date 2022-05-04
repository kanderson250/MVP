import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WheelGrid = styled.div`
  display: grid;
  grid-template-columns: 30px 25px 30px 25px 30px;
  grid-template-rows: 30px 30px 30px 30px 30px;
  justify-items: center;
  align-items: center;
  margin: 20px;
`;

const Dummy = styled.div`
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 4;
  grid-column-end: 5;
`;
const Letter = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  grid-column-start: ${(props) => props.col};
  grid-column-end: span 1;
  grid-row-start: ${(props) => props.row};
  grid-row-end: span 1;
`;

const Svg = styled.svg`
  grid-column-start: 3;
  grid-column-end: span 1;
  grid-row-start: 3;
  grid-row-end: span 1;
`;


function Wheel({letters}){
  const positions = [[3, 3], [1, 3], [2,5], [4,5], [5,3], [4,1], [2,1]];
  return (
    <WheelGrid>
      <Svg width='200px' stroke = 'rgb(0, 191, 255, .5)' fill = 'rgb(0, 191, 255, .3)' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="148,183.138438763306 52,183.138438763306 4,100 52,16.8615612366939 148,16.8615612366939 196,100 148,183.138438763306 52,16.8615612366939 148,16.8615612366939 52,183.138438763306 4,100 196,100"/>
      </Svg>
      <Svg width= '60px' fill = 'rgb(0, 191, 255, .5)' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="148,183.138438763306 52,183.138438763306 4,100 52,16.8615612366939 148,16.8615612366939 196,100"/>
      </Svg>
      {letters.map((letter, i) => (
        <Letter row={positions[i][0]} col={positions[i][1]}>{letter.toUpperCase()}</Letter>
      ))}
    </WheelGrid>
  );
}

Wheel.propTypes = {
  letters: PropTypes.array
};

export default Wheel;