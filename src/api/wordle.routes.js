const wordleDatabase = require('../data/wordle.database');

const wordleRouter = require('express')();

wordleRouter.post('/', async (req, res) => {
  const word = req.body.word;

  const wordleId = await wordleDatabase.createWordle(word);

  res.send({ wordleId });
});

wordleRouter.get('/:wordleId', async (req, res) => {
  const wordleId = req.params.wordleId;

  const wordle = await wordleDatabase.getWordle(wordleId);

  res.send({ wordCount: wordle.length });
});

wordleRouter.post('/:wordleId', async(req, res) => {
  const wordle = await wordleDatabase.getWordle(wordleId);

  const word = req.body.word;

  if (wordle.length === word.length) {
    const results = solveWordle(wordle, word);

    res.send(results);
  } else {
    res
      .status(403)
      .send(
        `La palabra introducida ${word} tiene ${word.length} caracteres, y el wordle es de ${wordle.length}!!!`
      );
  }
});

function solveWordle(wordle, word) {
  const emojis = [];

  let matches = 0;
  for (let i = 0; i < word.length; i++) {
    if (wordle[i] === word[i]) {
      emojis.push('🟩');
      matches++;
    } else if (wordle.includes(word[i])) {
      emojis.push('🟨');
    } else {
      emojis.push('⬜');
    }
  }

  return {
    success: matches === wordle.length,
    emojis
  };
}

module.exports = wordleRouter;
