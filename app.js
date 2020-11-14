const express = require('express');
const router = require('./routes/index.js');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(router);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.redirect('/game');
});

app.get('/game', (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
});

app.get('/questions', (req, res) => {
  res.sendFile(`${__dirname}/public/html/manage.html`);
});

app.listen(PORT);
