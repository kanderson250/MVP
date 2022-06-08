import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Word from './Word.jsx';
import Slider from './Slider.jsx';

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

Found.propTypes = {
  words: PropTypes.array,
  score: PropTypes.number,
  pointTotal: PropTypes.number,
};

Found.defaultProps = {
  words: [],
  score: 0,
  pointTotal: 0,
};

function Found({ words, score, pointTotal }) {
  let currentIndex;
  const pct = pointTotal ? score / pointTotal : 0;
  if (pct < 0.1) {
    currentIndex = 0;
  } else if (pct < 0.2) {
    currentIndex = 1;
  } else if (pct < 0.5) {
    currentIndex = 2;
  } else if (pct < 0.8) {
    currentIndex = 3;
  } else {
    currentIndex = 4;
  }
  return (
    <StyledFound>
      <h3>
        You have found
        {' '}
        {words.length}
        {' '}
        { words.length === 1 ? ' word' : ' words'}
        , worth
        {' '}
        { score }
        {' '}
        points.
        {' '}
      </h3>
      <Slider currentIndex={currentIndex} />
      <StyledWordList>
        {/* { cols.map(i => <WordColumn wordList = {words.slice(i*8, (i+1) * 8)}/>)} */}
        { words.map((wordData) => <Word key={wordData.id} wordData={wordData} />)}
      </StyledWordList>
    </StyledFound>
  );
}

export default Found;
