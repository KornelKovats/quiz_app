const express = require('express');
const sqlQuery = require('../database/database');

const apiGame = express.Router();

apiGame.get('/game', async (req, res) => {
  const randomQuestion = {};
  const selectRandomQuestion = 'SELECT * FROM questions ORDER BY RAND() LIMIT 1;';
  const selectRandomAnswers = 'SELECT * FROM answers WHERE question_id=?;';
  try {
    const randomQuestionRows = await sqlQuery(selectRandomQuestion);
    const randomAnswersRows = await sqlQuery(selectRandomAnswers,[randomQuestionRows[0].id]);
    Object.assign(randomQuestion, randomQuestionRows[0]);
    Object.assign(randomQuestion,{ answers: randomAnswersRows });
    res.json(randomQuestion);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

module.exports = apiGame;
