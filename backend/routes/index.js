const express = require('express');
const apiQuestions = require('./questions');
const apiGame = require('./game');
const apiDelete = require('./delete');
const apiPostQuestion = require('./post-add-question');

const router = express.Router();

router.use(express.json());

router.use('/api', apiQuestions);
router.use('/api', apiGame);
router.use('/api', apiDelete);
router.use('/api', apiPostQuestion);

module.exports = router;