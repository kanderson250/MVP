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
  flex-wrap: wrap;
  width: 400px;
  height: 200px;
  gap: 5px;
  align-items: flex-start;
  overflow-x: auto;
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
  // let colNum = Math.ceil(words.length / 8);
  // const cols = Array(colNum).fill(0).map((i, index) => index);
  return (
    <StyledFound>
      <h3>You have found {words.length} { words.length === 1 ? ' word' : ' words'}, worth { score } points. </h3>
      <Slider currentIndex = {currentIndex}/>
      <StyledWordList>
        {/* { cols.map(i => <WordColumn wordList = {words.slice(i*8, (i+1) * 8)}/>)} */}
        { words.map((wordData) => <Word key = {wordData.id} wordData={wordData} />)}
      </StyledWordList>
    </StyledFound>
  );
}

Found.propTypes = {
  words: PropTypes.array,
  score: PropTypes.number,
}

export default Found;
