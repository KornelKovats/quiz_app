const express = require('express');
const sqlQuery = require('../database/database');

const apiQuestions = express.Router();

apiQuestions.get('/questions', async (req, res) => {
  const query = 'SELECT question FROM questions;';
  try {
    let rows = await sqlQuery(query);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
module.exports = apiQuestions;