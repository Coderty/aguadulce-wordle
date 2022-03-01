const bodyParser = require('body-parser');
const wordleDatabase = require('../data/wordle.database');

const wordleRouter = require('express')();

wordleRouter.use(bodyParser.json());

wordleRouter.post('/', async (req, res) => {
  const word = String(req.body.word).toUpperCase();

  try {
    const realWord = await wordleDatabase.checkIsRealWord(word);
    if (realWord) {
      const wordleId = await wordleDatabase.createWordle(word);
      res.send({ wordleId });
    } else {
      throw Error(`${word} no existe en el diccionario`);
    }

  } catch (err) {
    res.status(500).send(err);
  }
});

wordleRouter.get('/:wordleId', async (req, res) => {
  const wordleId = req.params.wordleId;

  const wordle = await wordleDatabase.getWordle(wordleId);

  res.send({ wordCount: wordle.length });
});

wordleRouter.post('/:wordleId', async (req, res) => {
  const wordleId = req.params.wordleId;
  const word = String(req.body.word).toUpperCase();

  const wordle = await wordleDatabase.getWordle(wordleId);

  if (wordle.length === word.length) {
    const results = solveWordle(wordle, word);

    res.send(results);
  } else {
    res.status(403).send({
      error: `La palabra introducida ${word} tiene ${word.length} caracteres, y el wordle es de ${wordle.length}!!!`,
    });
  }
});

wordleRouter.use('**', (req, res) => res.status(404).end());

function solveWordle(wordle, word) {
  const emojis = [];

  let matches = 0;
  for (let i = 0; i < word.length; i++) {
    if (wordle[i] === word[i]) {
      emojis.push({
        letter: word[i],
        color: '#6ca967',
        emoji: '🟩',
      });
      matches++;
    } else if (wordle.includes(word[i])) {
      emojis.push({
        letter: word[i],
        color: '#c8b35e',
        emoji: '🟨',
      });
    } else {
      emojis.push({
        letter: word[i],
        color: '#3a3a3c',
        emoji: '⬜',
      });
    }
  }

  return {
    success: matches === wordle.length,
    emojis,
  };
}

module.exports = wordleRouter;
