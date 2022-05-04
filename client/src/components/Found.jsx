import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Word from './Word.jsx';

function Found({ words, score, panagrams }) {
  return (
    <div>
      <h3>You have found {words.length} { words.length === 1 ? ' word' : ' words'}, worth { score } points. </h3>
      <div>
        { words.length ? words.map((wordData) => <Word wordData={wordData} />) : null}
      </div>
    </div>
  );
}

Found.propTypes = {
  words: PropTypes.array,
  score: PropTypes.number,
  panagrams: PropTypes.array,
};

export default Found;
