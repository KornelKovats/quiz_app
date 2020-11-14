const express = require('express');
const sqlQuery = require('../database/database');

const apiPostQuestion = express.Router();

apiPostQuestion.post('/questions', async (req, res) => {
  const insertQuestionQuery = 'INSERT INTO questions (question) VALUES(?);';
  const question = [req.body.question];
  const insertAnswers = [];
  const answers = req.body.answers;
  try {
    const insertQuestion = await sqlQuery(insertQuestionQuery, question)
    const questionId = insertQuestion.insertId;
    answers.forEach((element, index) => {
      const answer = [];
      answer.push(questionId);
      answer.push(element[`answer_${index+1}`]);
      if(element.is_correct === 1) {
        answer.push(1);
      }else{
        answer.push(0);
      }
      insertAnswers.push(answer);
    })
    const insertAnswersQuery = 'INSERT INTO answers (question_id,answer,is_correct) VALUES ?;';
    let rows = await sqlQuery(insertAnswersQuery, [insertAnswers])
    res.json(rows);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

module.exports = apiPostQuestion;
