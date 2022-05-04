import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Input from './components/Input.jsx';
import Found from './components/Found.jsx';
import Wheel from './components/Wheel.jsx';
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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const Header = styled.h1`
  margin: 30px;
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

function App() {
  const [bank, setBank] = useState([]);
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [allWords, setAllWords] = useState([]);

  //startup function: retrieves the list of letters and initializes a list of permissible answers from the API.

  useEffect(() => {
    axios.get('/starter_letters')
      .then((response) => {
        setBank(response.data)
        return axios.get(`/all_matches/${response.data.join('')}`)
      })
      .then(response => makeWordList(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  //helper function to process the permissible answers returned by the API.
  const makeWordList = (wordList) => {
    let unorderedWordList = {};
    wordList.forEach(word => list[word] = { found: false, definition: null});
    setAllWords(unorderedWordList);
  }

  //toggles a found word to 'true', toggles on 'panagram' if it is one, and adds its point value to score.
  const addWord = (wordData) => {
    const { word, definitions } = wordData;
    const newWords = {...allWords};
    newWords[word].found = true;
    newWords[word].definition = definitions[0];
    setWords(newWords);
    let bonus = 0;
    if (panagram(word)) {
      allWords[word].found = 'panagram';
      bonus = 7;
    }
    setScore(score + word.length + bonus );
  };

  //boolean indicating if word is a panagram.
  const panagram = (word) => {
    let allLetters = true;
    bank.forEach(letter => {
      if (word.indexOf(letter) === -1) allLetters = false;
    })
    return allLetters;
  };

  //helper function handling potatoboi easter egg

  const handlePotato = () => {}

  const submitWord = (word) => {
    if (word === 'potatoboi') {
      const potato = {};
      potato.word = 'potatoboi';
      potato.definitions = [{ definition: 'Potato get em, potato got em. Potato top, potato bottom.', partOfSpeech: 'noun'}];
      addWord(potato);
    }
    if (allWords[word] && !allWords[word].found) {
      axios.get(`/lookup/${word}`)
        .then((response) => {
          if (response.data) {
            addWord(response.data);
            scoreWord(word);
          }
        })
        .catch((err) => console.log(err));
    }
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
        <Found words={words} score = {score} panagrams = {panagrams}/>
      </GameContainer>
    </AppContainer>
  );
}

root.render(<App />);
