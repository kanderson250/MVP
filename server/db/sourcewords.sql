CREATE TABLE IF NOT EXISTS words (
  id SERIAL PRIMARY KEY,
  word VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS sourcewords (
  id SERIAL PRIMARY KEY,
  SELECT word FROM allwords
);

SELECT * FROM words WHERE word ~ '^(?=.*a)[awkrdly]{4,}$';

\COPY words (word) FROM '2of12inf.txt';