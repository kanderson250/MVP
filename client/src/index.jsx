import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const root = createRoot(document.getElementById('root'));

function App() {
  const [letters, setLetters] = useState('');
  useEffect(() => {
    axios.get('/starter_word')
      .then(response => setLetters(response.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      This is the app. Say hi,
      {' '}
      {letters}
      .
    </div>
  );
}

root.render(<App />);
