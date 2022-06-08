import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

const modalStyles = {
  content: {
    fontFamily: 'Roboto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const StyledWord = styled.div`
  width: 120px;
`;

Word.propTypes = {
  wordData: PropTypes.object
};



function Word({ wordData }) {
  const [showDefs, setShowDefs] = useState(false);


  const toggleDefinitions = () => {
    setShowDefs(!showDefs);
  };

  return (
    <StyledWord>
      <div onClick = {toggleDefinitions}>{wordData.word}</div>
      <Modal
        isOpen={showDefs}
        contentLabel="Example Modal"
        onRequestClose = {toggleDefinitions}
        style = {modalStyles}
      >
        <h4>
          {wordData.word}
        </h4>
        <span>{`(${wordData.definition?.partOfSpeech}) ${wordData.definition?.definition}`}</span>

      </Modal>
    </StyledWord>
    );


};

export default Word;
