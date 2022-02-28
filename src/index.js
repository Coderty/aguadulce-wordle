const express = require('express');
const bodyParser = require('body-parser');
const wordleApi = require('./api/wordle.api')

const app = express()
const port = 3000

app.use(bodyParser.json());

wordleApi(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
