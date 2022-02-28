const express = require('express');
const bodyParser = require('body-parser');
const worldleRouter = require('./api/wordle.routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/wordle', worldleRouter)

app.listen(port, () => {
  console.log(`Wordle app listening on port ${port}`)
})
