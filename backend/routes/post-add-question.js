const express = require('express');
const db = require('../database/database');

const apiPostQuestion = express.Router();

apiPostQuestion.post('/questions', (req, res) => {
  const insertQuestionQuery = 'INSERT INTO questions (question) VALUES(?);';
  const question = [req.body.question];
  const insertAnswers = [];


  db.query(insertQuestionQuery, question, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.sendStatus(500);
      return;
    }
    const questionId = rows.insertId;
    req.body.answers.forEach((element, index) => {
      const answer = [];
      answer.push(questionId);
      answer.push(element[`answer_${index+1}`]);
      if(element.is_correct === 1) {
        answer.push(1);
      }else{
        answer.push(0);
      }
      insertAnswers.push(answer);
    });
    insertAnswersQuery = 'INSERT INTO answers (question_id,answer,is_correct) VALUES ?';
    db.query(insertAnswersQuery, [insertAnswers], (err,rows)=>{
      if (err) {
        console.log(err.sqlMessage);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    })
  })
});

module.exports = apiPostQuestion;
