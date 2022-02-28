const wordleRouter = require('express')();

wordleRouter.post('/:wordleId', (req, res) => {
  const word = req.body.word;

  res.send(`La palabra usada es ${word}`);
});

module.exports = wordleRouter;