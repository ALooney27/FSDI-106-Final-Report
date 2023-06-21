let isImportant = false;
let isVisible = true;

function toggleImportant() {
  const nonImportantIcon = "fa-regular fa-heart";
  const importantIcon = "fa-solid fa-heart active";
  if (!isImportant) {
    $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
    isImportant = true;
  } else {
    $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
    isImportant = false;
  }
}

function toggleInfo() {
  if (isVisible) {
    $(".info").hide();
    isVisible = false;
  } else {
    $(".info").show();
    isVisible = true;
  }
}

async function saveTask() {
  console.log("Saving Task...");

  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let dueDate = $("#selDueDate").val();
  let status = $("#selStatus").val();
  let budget = $("#txtBudget").val();
  let color = $("#selColor").val();

  console.log(title, description, dueDate, status, budget, color);

  let taskToSave = new Task(
    isImportant,
    title,
    description,
    dueDate,
    status,
    budget,
    color
  );

  //send task to the server
  let response = await fetch("https://fsdiapi.azurewebsites.net/api/tasks/", {
    method: "POST",
    body: JSON.stringify(taskToSave),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.ok) {
    displayTask(taskToSave);
    clearForm();

    // get data from the response
    let data = await response.json();
    console.log(data);
  } else {
    alert("Error saving tasks, please try again.");
  }
}

function displayTask(task) {
  let syntax = `
  <div class="task" style="border-color:${task.color}">
  <div class="details">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>
    
    <label>${task.status}</label>    
    <label>$${task.budget}</label>   
    <label>${task.dueDate}</label>
    </div>
  `;

  $("#pending-tasks").append(syntax);
}

function clearForm() {
  $("#txtTitle").val("");
  $("#txtDescription").val("");
  $("#selDueDate").val("");
  $("#selStatus").val("");
  $("#txtBudget").val("");
  $("#selColor").val("");
}

async function testRequest() {
  let response = await fetch("https://fsdiapi.azurewebsites.net/");
  console.log(response);
}

async function loadTasks() {
  // get https://fsdiapi.azurewebsites.net/api/tasks/
  // console log the data from the response
  let response = await fetch("https://fsdiapi.azurewebsites.net/api/tasks/");
  if (response.ok) {
    let data = await response.json();
    for (let index = 0; index < data.length; index++) {
      let task = data[index];
      if (task.name == "Anthony") {
        displayTask(task);
      }
    }
  } else {
    alert("Error loading tasks!");
  }
}

async function deleteAll() {
  let response = await fetch(
    "https://fsdiapi.azurewebsites.net/api/tasks/clear/Anthony/",
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    $(".task").remove();
  } else {
    alert("Error delete your tasks");
  }
}

function init() {
  console.log("Task manager");

  // load data
  loadTasks();

  // hook events
  $("#btnSave").click(saveTask);
  $("#iImportant").click(toggleImportant);
  $("#btnInfo").click(toggleInfo);
  $("#btnDelete").click(deleteAll);
}

window.onload = init;

/**
 * create the button
 * <button>Delete</button>
 * catch the click event and call a function
 * the function should send a DELETE request to /api/tasks/clear/<YOURNAME>/
 *
 *
 */
