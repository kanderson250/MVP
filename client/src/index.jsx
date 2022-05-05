import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Input from './components/Input.jsx';
import Found from './components/Found.jsx';
import Wheel from './components/Wheel.jsx';
import HintTable from './components/HintTable.jsx';
import Modal from 'react-modal';
import styled, { createGlobalStyle } from 'styled-components';

const root = createRoot(document.getElementById('root'));


const GlobalStyleContainer = createGlobalStyle`

  body {
    font-family: Roboto;
    font-weight: 200;
  }
  h1,h2,h3,h4 {
    font-weight: 500;
  }
`;
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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  margin: 30px;
  margin-top: 100px;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 150px;
  margin: 80px;
`;

const WheelAndInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  font-family: Montserrat;
  border-radius: 10px;
  border: none;
  background-color: black;
  color: white;
`;

function App() {
  const [bank, setBank] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [allWords, setAllWords] = useState([]);
  const [hintMatrix, setHintMatrix] = useState([]);
  const [showHints, setShowHints] = useState(false);

  //Starts the app by fetching the list of letters and permissible answers from the API.
  useEffect(() => {
    let bankLetters;
    axios.get('/starter_letters')
      .then((response) => {
        setBank(response.data);
        bankLetters = response.data;
        return axios.get(`/all_matches/${response.data.join('')}`)
      })
      .then(response => {
        makeWordList(response.data.data);
        generateHintMatrix(response.data.data, bankLetters);
      })
      .catch((err) => console.log(err));
  }, []);

  //Processes the permissible answers returned by the API.
  const makeWordList = (wordList) => {
    let newList = {};
    wordList.forEach(word => newList[word] = { found: false, definition: null});
    setAllWords(newList);
  };
  //generates a matrix of hints to be turned into a hint table

  const generateHintMatrix = (list, bank) => {
    const positions = {};
    const sorted = [...bank].sort();
    sorted.forEach((char, index) => positions[char] = index);
    let matrix = [[], [], [], [], [], [], []];
    let maxLetters = 0;
    list.forEach(word => {
      let i = positions[word[0]];
      let j = word.length;
      matrix[i][j-4] = matrix[i][j-4] ? matrix[i][j-4] + 1 : 1;
      maxLetters = Math.max(maxLetters, j-4);
    } )
    matrix.forEach(i => {
      for (let j = 0; j <= maxLetters; j++) {
        if (!i[j]) i[j] = 0;
      }
    });
    setHintMatrix(matrix);
  };


  //toggles a found word to 'true', toggles on 'panagram' if it is one, and adds its point value to score.
  const addWord = (wordData) => {
    const { word, definitions } = wordData;
    const newWords = {...allWords};
    newWords[word].found = true;
    newWords[word].definition = definitions[0];
    setAllWords(newWords);
    const newFoundWords = [...foundWords];
    newFoundWords.push({ word: word, definition: definitions[0]});
    newFoundWords.sort((a, b) => a.word < b.word ? -1 : 1);
    setFoundWords(newFoundWords);
    let bonus = 0;
    if (panagram(word)) {
      allWords[word].found = 'panagram';
      bonus = 7;
    }
    setScore(score + word.length + bonus );
  };

  //Indicates if word is a panagram.
  const panagram = (word) => {
    let allLetters = true;
    bank.forEach(letter => {
      if (word.indexOf(letter) === -1) allLetters = false;
    })
    return allLetters;
  };

  //Handles potatoboi easter egg
  const handlePotato = () => {
    const potato = {};
    potato.word = 'potatoboi';
    potato.definitions = [{ definition: 'Potato get em, potato got em. Potato top, potato bottom.', partOfSpeech: 'noun'}];
    addWord(potato);
  }

  //Handles submission of user guess.
  const submitWord = (word) => {
    if (word === 'potatoboi') { handlePotato(); }
    if (allWords[word] && !allWords[word].found) {
      axios.get(`/lookup/${word}`)
        .then((response) => {
          if (response.data) {
            addWord(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };
  return (
    <AppContainer>
      <GlobalStyleContainer />
      <Header>Spelling Spree</Header>
      <GameContainer>
        <WheelAndInput>
          <Wheel letters = {bank}/>
          <Input submitWord={submitWord} />
        </WheelAndInput>
        <Found words={foundWords} score = {score}/>
      </GameContainer>
      <Modal
        isOpen={showHints}
        contentLabel="Hint Modal"
        onRequestClose = {toggleHints}
        style = {modalStyles}
      >
        <HintTable hintMatrix = {hintMatrix} bank = {bank}/>
      </Modal>
      <Button onClick = {toggleHints}>Show Hints</Button>
    </AppContainer>
  );
}

root.render(<App />);
