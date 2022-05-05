import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Word from './Word.jsx';
import styled from 'styled-components';

const StyledFound = styled.div`
`;

const StyledWordList = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  gap: 5px;
  flex-wrap: wrap;
  overflow-x: scroll;
`;

function Found({ words, score }) {
  return (
    <StyledFound>
      <h3>You have found {words.length} { words.length === 1 ? ' word' : ' words'}, worth { score } points. </h3>
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
