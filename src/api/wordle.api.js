const router = require('express')();

module.exports = (app) => {
  app.use('/wordle', router);

  router.post('/:wordleId', (req, res) => {
    console.log(req.body)
    const word = req.body.word;

    res.send(`La palabra usada es ${word}`);
  });
}
