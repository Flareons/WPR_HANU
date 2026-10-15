
'use strict';

const express = require('express');
const app = express();

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
  {
    joke: 'Why did the student eat his homework?',
    response: 'Because the teacher told him it was a piece of cake!'
  },
  {
    joke: 'What kind of tree fits in your hand?',
    response: 'A palm tree'
  },
  {
    joke: "Why don't scientists trust atoms?",
    response: 'Because they make up everything'
  },
  {
    joke: 'What did the left eye say to the right eye?',
    response: 'Between you and me, something smells.'
  }
];

let lameJoke = [
  {
    joke: 'Which bear is the most condescending?',
    response: 'Pan-DUH'
  },
  {
    joke: 'What would the Terminator be called in his retirement?',
    response: 'The Exterminator'
  },
  {
    joke: 'Why did it get so hot in the baseball stadium after the game?',
    response: 'All of the fans left.'
  }
];

app.use(express.static('public'));

// Endpoint 1: GET /jokebook/categories
app.get('/jokebook/categories', (req, res) => {
  const result = categories
    .map(category => `a possible category is ${category}`)
    .join('\n');

  res.type('text/plain').send(result);
});

// Endpoint 2: GET /jokebook/joke/:category
app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;

  if (!categories.includes(category)) {
    return res.status(404).json({
      error: 'no category listed for category'
    });
  }

  const jokes = category === 'funnyJoke'
    ? funnyJoke
    : lameJoke;

  const randomIndex = Math.floor(Math.random() * jokes.length);

  res.json(jokes[randomIndex]);
});

app.listen(8000, () => {
  console.log('Jokebook API running at http://localhost:8000');
});
