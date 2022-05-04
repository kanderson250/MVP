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
  console.log(word);
  res.send(word);
});

app.get('/lookup/:word', (req, res) => {
  const { word } = req.params;
  axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, { headers: { 'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com', 'X-RapidAPI-Key': API_KEY } })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(null));
});

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
