const express = require('express')
  , bodyParser = require('body-parser')
  , serverController = require('./serverController.js')
  , app = express();

app.use(bodyParser.json());
app.set('view engine', 'ejs');


// ENDPOINTS:

app.get('/character/:name', serverController.characterByName);
/**
 * INSTRUCTIONS:
 * '/character/:name' 
 * Returns an EJS view (nothing too fancy) with data about the given character. 
 * (Needs to work with at least 'luke', 'han', 'leia', and 'rey')
 */

app.get('/characters', serverController.getCharacters);
/**
 * INSTRUCTIONS:
 * '/characters' 
 * Returns raw JSON of 50 characters (doesn't matter which 50). 
 * This endpoint should be able to take a query parameter in the URL called 'sort' and the potential sort parameters will be 1 of the following, 
 * ['name', 'mass', 'height']  So the endpoint '/characters?sort=height' should return JSON of 50 characters sorted by their height.
 */

app.get('/planetresidents', serverController.getPlanetResidents);
/**
 * INSTRUCTIONS:
 * '/planetresidents' 
 * Return raw JSON in the form 
 * {planetName1: [characterName1, characterName2], planetName2: [characterName3]}.
 * So it is an object where the keys are the planet names, and the values are lists of residents names for that planet
 */


// PORT 
const PORT = 3005
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
