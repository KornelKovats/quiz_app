const form = document.querySelector("#create_form");

form.addEventListener("submit", async (event) => {
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
  });
  await fetch(`https://kornelsquizapp.herokuapp.com/api/questions`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  alert("Question has been created!");
  await loadQuestion();
});


async function loadQuestion() {
  const table = document.querySelector("table");
  table.innerHTML = "";
  let response = await fetch(`https://kornelsquizapp.herokuapp.com/api/questions`);
  let data = await response.json();
  data.forEach((element, index) => {
    const row = document.createElement("tr");
    const columnNumber = document.createElement("td");
    const columnQuestion = document.createElement("td");
    const columnDeleteButton = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-secondary";
    deleteButton.dataset.id = `${element.id}`;
    deleteButton.innerText = "Delete";
    columnNumber.innerText = index + 1;
    columnQuestion.innerText = element.question;
    columnDeleteButton.appendChild(deleteButton);

    row.setAttribute("id", `${element.id}`);
    row.appendChild(columnNumber);
    row.appendChild(columnQuestion);
    row.appendChild(columnDeleteButton);

    table.appendChild(row);
  });
}