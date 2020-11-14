const deletionContainer = document.querySelector(".manage_container");

window.addEventListener("load", loadQuestion);

async function loadQuestion() {
  const table = document.querySelector("table");
  table.innerHTML = "";
  let response = await fetch(`${process.env.PATH}/api/questions`);
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

deletionContainer.addEventListener("click", async (event) => {
  const { id } = event.target.dataset;
  try {
    let response = await fetch(`${process.env.PATH}/api/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    await loadQuestion();
  } catch (error) {
    console.log(error);
  }
});
