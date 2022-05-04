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

  useEffect(() => {
    axios.get('/starter_letters')
      .then((response) => setBank(response.data))
      .catch((err) => console.log(err));
  }, []);

  const addWord = (wordData) => {
    const newWords = [...words];
    newWords.push(wordData);
    setWords(newWords);
  };

  const panagram = (word) => {
    let allLetters = true;
    bank.forEach(letter => {
      if (word.indexOf(letter) === -1) allLetters = false;
    })
    return allLetters;
  };

  const scoreWord = (word) => {
    const bonus = panagram(word) ? 7 : 0;
    setScore(score + word.length + bonus);
  };

  const checkWord = (word) => {
    for (const char of word) {
      if (!bank.includes(char)) {
        return false;
      }
      if (!word.includes(bank[0])) {
        return false;
      }
    }
    if (words.map(wordData => wordData.word).includes(word)) {
      return false;
    }
    return true;
  };

  const submitWord = (word) => {
    if (word === 'potatoboi') {
      const potato = {};
      potato.word = 'potatoboi';
      potato.definitions = [{ definition: 'Potato get em, potato got em. Potato top, potato bottom.', partOfSpeech: 'noun'}];
      addWord(potato);
    }
    if (word.length >= 4 && checkWord(word)) {
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
        <Found words={words} score = {score}/>
      </GameContainer>
    </AppContainer>
  );
}

root.render(<App />);
