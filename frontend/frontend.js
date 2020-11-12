const express = require('express');

const app = express();
const PORT = 8080;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/game');
});

app.get('/game', (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
});

app.get('/questions', (req, res) => {
  res.sendFile(`${__dirname}/public/html/manage.html`);
});

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});