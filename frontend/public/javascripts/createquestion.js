const form = document.querySelector('#create_form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = document.querySelector('#question').value;
  const answers = [];
  const isCorrect = document.querySelectorAll('.isgood');
  isCorrect.forEach((element, index) => {
    const answer = {};
    answer[`answer_${index+1}`] = document.querySelector(`#answer_${index + 1}`).value;
    if (element.checked === true) {
      answer.is_correct = 1;
    } else {
      answer.is_correct = 0;
    }
    answers.push(answer);
  });
  const obj = { question, answers };

  fetch('http://localhost:3000/api/questions', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  alert('Question has been created!');
});
