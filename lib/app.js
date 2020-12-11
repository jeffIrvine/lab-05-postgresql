const State = require('./models/States');
const express = require('express');
const app = express();


app.use(express.json());

app.post('/states', (req, res) => {
  State
    .insert(req.body)
    .then(state => res.send(state));
});

app.get('/states', (req, res) => {
  State
    .find()
    .then(state => res.send(state));
});

app.get('/states/:id', (req, res, next) => {
  State
    .findById(req.params.id)
    .then(state => res.send(state))
    .catch(next);
});

app.put('/states/:id', (req, res, next) => {
  State
    .update(req.params.id, req.body)
    .then(state => res.send(state))
    .catch(next);
});

app.delete('/states/:id', (req, res) => {
  State
    .delete(req.params.id)
    .then(state => res.send(state));
});

module.exports = app;
