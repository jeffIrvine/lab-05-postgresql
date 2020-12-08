require('dotenv').config();
const Sauce = require('./lib/models/sauce');
const express = require('express');

const app = express();
app.use(express.json());

Sauce
  .insert({ name: 'test', description: 'test', url: 'http://url.com' })
  .then(console.log);

Sauce
  .findById(2)
  .then(console.log);
    
app.listen('3001', () => {
  console.log('app is listening on port 3001');
});
