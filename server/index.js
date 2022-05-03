const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/starter_word', (req, res) => {
  res.send('potatoboi');
});

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
