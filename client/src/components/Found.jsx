import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Word from './Word.jsx';
import Slider from './Slider.jsx';
import styled from 'styled-components';

const StyledFound = styled.div`
`;

const StyledWordList = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  background-color: lightgray;
  gap: 5px;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-x: scroll;
`;

function Found({ words, score, pointTotal }) {
  let currentIndex;
  let pct = pointTotal ? score/pointTotal : 0;
  if (pct < .1) {
    currentIndex = 0;
  } else if (pct < .2) {
    currentIndex = 1;
  } else if (pct < .5) {
    currentIndex = 2;
  } else if (pct < .8) {
    currentIndex = 3
  } else {
    currentIndex = 4;
  }
  return (
    <StyledFound>
      <h3>You have found {words.length} { words.length === 1 ? ' word' : ' words'}, worth { score } points. </h3>
      <Slider currentIndex = {currentIndex}/>
      <StyledWordList>
        { words.length ? words.map((wordData) => <Word key = {wordData.id} wordData={wordData} />) : null}
      </StyledWordList>
    </StyledFound>
  );
}

Found.propTypes = {
  words: PropTypes.array,
  score: PropTypes.number,
}

export default Found;
