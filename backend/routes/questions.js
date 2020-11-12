const express = require('express');
const db = require('../database/database');

const apiQuestions = express.Router();

apiQuestions.get('/questions', async (req, res) => {
  const query = 'SELECT question FROM questions;';
  /* db.query(query, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  }); */
  try {
    let rows = await sqlQuery(query);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
module.exports = apiQuestions;

function sqlQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, rows) => {
      if (err) {
        reject(err.sqlMessage);
      }
      resolve(rows);
    });
  });
}
