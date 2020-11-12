const form = document.querySelector("#create_form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = document.querySelector("#question").value;
  const answers = [];
  const isCorrect = document.querySelectorAll(".isgood");
  console.log(isCorrect);
  
  const obj = { question, answers };
  isCorrect.forEach((element, index) => {
    console.log(element);
    const answer = {};
    if (document.querySelector(`#answer_${index + 1}`).value !== "") {
      answer[`answer_${index + 1}`] = document.querySelector(
        `#answer_${index + 1}`
      ).value;
      if (element.checked === true) {
        answer.is_correct = 1;
      } else {
        answer.is_correct = 0;
      }
      answers.push(answer);
    }
    loadQuestion();
  });
  fetch("http://localhost:3000/api/questions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  alert("Question has been created!");
});


function loadQuestion() {
  const table = document.querySelector('table');
  table.innerHTML = '';
  fetch('http://localhost:3000/api/questions')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element, index) => {
        const row = document.createElement('tr');
        const columnNumber = document.createElement('td');
        const columnQuestion = document.createElement('td');
        const columnDeleteButton = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-secondary';
        deleteButton.dataset.id = `${index + 1}`;
        deleteButton.innerText = 'Delete';

        columnNumber.innerText = index + 1;
        columnQuestion.innerText = element.question;
        columnDeleteButton.appendChild(deleteButton);

        row.setAttribute('id', `${index + 1}`);
        row.appendChild(columnNumber);
        row.appendChild(columnQuestion);
        row.appendChild(columnDeleteButton);

        table.appendChild(row);
      });
    });
}