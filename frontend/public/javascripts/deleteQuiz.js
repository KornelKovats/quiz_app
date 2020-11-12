const deletionContainer = document.querySelector('.manage_container');

window.addEventListener('load', loadQuestion);

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

deletionContainer.addEventListener('click', (event) => {
  const { id } = event.target.dataset;
  fetch(`http://localhost:3000/api/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        loadQuestion();
      }
    });
});
