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
    width: '500px',
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

const ButtonBanner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
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
  const [showRules, setShowRules] = useState(false);
  const [pointTotal, setPointTotal] = useState(0);

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
        console.log(response.data);
        makeWordList(response.data);
        generateHintMatrix(response.data, bankLetters);
        scoreAll(response.data, bankLetters);
      })
      .catch((err) => console.log(err));
  }, []);

  //Processes the permissible answers returned by the API.
  const makeWordList = (wordList) => {
    let newList = {};
    wordList.forEach(wordData => {
      const { word, id } = wordData;
      newList[word] = { found: false, definition: null, id: id};
    });
    setAllWords(newList);
  };
  //generates a matrix of hints to be turned into a hint table

  const generateHintMatrix = (list, bank) => {
    const positions = {};
    const sorted = [...bank].sort();
    sorted.forEach((char, index) => positions[char] = index);
    let matrix = [[], [], [], [], [], [], []];
    let maxLetters = 0;
    list.forEach(wordData => {
      let word = wordData.word;
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

  //calculates point total for the word list
  const scoreAll = (wordList, bank) => {
    let total = 0;
    wordList.forEach(wordData => {total += scoreWord(wordData.word, bank)});
    setPointTotal(total);
  };

  //toggles a found word to 'true', toggles on 'panagram' if it is one, and adds its point value to score.
  const addWord = (wordData) => {
    //change the status of the word in the master word list.
    const { word, definitions } = wordData;
    const newWords = {...allWords};
    newWords[word].found = true;
    newWords[word].definition = definitions[0];
    setAllWords(newWords);
    //update the found word list.
    const newFoundWords = Object.keys(newWords)
      .filter(word => newWords[word].found)
      .sort()
      .map(word => ( { word, definition: newWords[word].definition, id: newWords[word].id }));
    console.log(newFoundWords);
    setFoundWords(newFoundWords);
    //add the new score.
    setScore(score + scoreWord(word, bank));
  };

  const scoreWord = (word, bank) => {
    const bonus = panagram(word, bank) ? 7 : 0;
    return word.length + bonus;
  }

  //Indicates if word is a panagram.
  const panagram = (word, bank) => {
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

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <AppContainer>
      <GlobalStyleContainer />
      <Header>Spelling Spree</Header>
      <ButtonBanner>
        <Button onClick = {toggleRules}>Rules</Button>
        <Button onClick = {toggleHints}> Hints</Button>
      </ButtonBanner>
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
        id = 'hints'
      >
        <HintTable hintMatrix = {hintMatrix} bank = {bank}/>
      </Modal>
      <Modal
        isOpen={showRules}
        contentLabel="Rule Modal"
        onRequestClose = {toggleRules}
        id = 'rules'
        style = {modalStyles}
      >
        <h2>Make as many words as you can using the Word Wheel.</h2>
        <p>The Word Wheel displays seven letters, which you must use to create words.
          <b> The center letter is required. </b>
          All letters, including the center letter, may be repeated. </p>
          <p>Feeling stuck? Click  <b>'Hints'</b> to display the first letter and length of all the words in the puzzle.
          </p>
      </Modal>
    </AppContainer>
  );
}

root.render(<App />);
