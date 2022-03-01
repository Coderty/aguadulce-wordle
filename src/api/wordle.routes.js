const wordleRouter = require('express')();

wordleRouter.post('/:wordleId', (req, res) => {
  const wordle = 'AGUADULCE';

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
  const result = [];

  for (let i = 0; i < word.length; i++) {
    if (wordle[i] === word[i]) {
      result.push('🟩');
    } else if (wordle.includes(word[i])) {
      result.push('🟨');
    } else {
      result.push('⬜');
    }
  }

  return result;
}

module.exports = wordleRouter;
