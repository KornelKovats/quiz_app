const express = require('express');
const sqlQuery = require('../database/database');

const apiDelete = express.Router();

apiDelete.delete('/questions/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleteQuestionQuery = 'DELETE FROM questions WHERE id=?;';
  const deleteAnswersQuery = 'DELETE FROM answers WHERE question_id=?';
  await sqlQuery(deleteQuestionQuery, [id]);
  await sqlQuery(deleteAnswersQuery,[id]);
  res.json({
    message: 'Successfully deleted',
  })
});

module.exports = apiDelete;
