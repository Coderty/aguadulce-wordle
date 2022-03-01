const express = require('express');
const path = require('path');
const wordleRouter = require('./api/wordle.routes');
const pokemonMiddleware = require('./api/pokemon.middleware');

const app = express();
const port = 8080;

app.use(pokemonMiddleware);

app.use('/api/wordle', wordleRouter);

const staticRoute = path.resolve(__dirname, '../front/static/');

app.use('/static', express.static(staticRoute));

app.use('**', (req, res) => {
  const indexRoute = path.resolve(__dirname, '../front/index.html');
  res.sendFile(indexRoute);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
