const inputTitle = document.getElementById("input-title");
const inputNote = document.getElementById("input-note");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks =
    document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
  const taskTitle = inputTitle.value.trim();
  const taskNote = inputNote.value.trim();

  if (!taskTitle) {
    alert("Please write down a title");
    console.log("No title added");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
        <label>
            <input type="checkbox">
            <input type="text" value="${taskTitle}" readonly><br>
            <textarea placeholder="Task Note" rows="4" cols="30">${
              taskNote || ""
            }</textarea><br>
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Delete</span>
        </label>
    `;

  listContainer.appendChild(li);

  // Clear the input fields
  inputTitle.value = "";
  inputNote.value = "";

  // Attach event listeners to the new task
  const checkbox = li.querySelector("input[type='checkbox']");
  const editBtn = li.querySelector(".edit-btn");
  const taskTitleInput = li.querySelector("input[readonly]");
  const taskTextarea = li.querySelector("textarea");
  const deleteBtn = li.querySelector(".delete-btn");

  // Strike out the completed task
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const updateTitle = prompt("Edit title:", taskTitleInput.value);
    const updateNote = prompt("Edit note:", taskTextarea.value);
    if (updateTitle !== null && updateNote !== null) {
      taskTitleInput.value = updateTitle;
      taskTextarea.value = updateNote;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

// Add task when pressing Enter key
inputTitle.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

inputNote.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
