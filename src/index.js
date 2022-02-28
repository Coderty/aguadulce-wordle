const express = require('express');
const bodyParser = require('body-parser');
const wordleRouter = require('./api/wordle.routes');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use('/api/wordle', wordleRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
