const pokedex = require('../data/pokedex');

const pokemon = pokedex[Math.floor(Math.random() * pokedex.length)];

console.log(`[SERVER ${pokemon} up & running!]`)

module.exports = (req, res, next) => {
  res.set('x-pokemon', pokemon);
  next();
};
