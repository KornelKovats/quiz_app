const express = require('express');
const db = require('../database/database');

const apiDelete = express.Router();

apiDelete.delete('/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.query(`DELETE FROM questions WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    db.query(`DELETE FROM answers WHERE question_id=${id}`, (err, rows) => {
      if (err) throw err;
      res.json('rows has been deleted');
    });
  });
});

module.exports = apiDelete;
