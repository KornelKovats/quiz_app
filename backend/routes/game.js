const express = require('express');
const db = require('../database/database');

const apiGame = express.Router();

apiGame.get('/game', (req, res) => {
  const randomQuestion = {};
  db.query('SELECT * FROM questions ORDER BY RAND() LIMIT 1;', (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.sendStatus(500);
      return;
    }
    Object.assign(randomQuestion, rows[0]);
    db.query(`SELECT * FROM answers WHERE question_id=${rows[0].id};`, (err, rows) => {
      if (err) {
        console.log(err.sqlMessage);
        res.sendStatus(500);
        return;
      }
      Object.assign(randomQuestion, { answers: rows });
      res.json(randomQuestion);
    });
  });
});

module.exports = apiGame;
