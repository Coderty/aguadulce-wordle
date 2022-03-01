const pokedex = require('../data/pokedex');

const pokemon = pokedex[Math.floor(Math.random() * pokedex.length)];

module.exports = (req, res, next) => {
  res.set('x-pokemon', pokemon);
  next();
};
