const express = require('express');
const path = require('path');
const axios = require('axios');
const { API_KEY } = require('../config.js');
const { letters } = require('./db/data.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/starter_letters', (req, res) => {
  const word = letters[Math.floor(Math.random() * letters.length)];
  const regexSearch = `^(?=.*${word[0]})${word}{4,}$`;
  res.send(word);
});

app.get('/all_matches/:letters', (req, res) => {
  const { letters } = req.params;
  const regexSearch = `^(?=.*${letters[0]})[${letters}]{4,}$`;
  console.log(regexSearch);
  axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=${regexSearch}&limit=500`, { headers: { 'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com', 'X-RapidAPI-Key': API_KEY } })
    .then(response => {
      res.send(response.data.results);
    })
    .catch(err => console.log(err));
})

app.get('/lookup/:word', (req, res) => {
  const { word } = req.params;
  axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, { headers: { 'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com', 'X-RapidAPI-Key': API_KEY } })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(null));
});

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
