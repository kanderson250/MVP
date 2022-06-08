const { db } = require('../db/db.js');

module.exports = {
  getMatches: (letters) => {
    const queryString = 'SELECT * FROM words WHERE word ~ $1';
    const regex = `^(?=.*${letters[0]})[${letters}]{4,}$`;
    return db.query(queryString, [regex]);
  },
};
