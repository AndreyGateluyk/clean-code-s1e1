var taskInput = document.querySelector(".new-task-input");
var addButton = document.querySelector(".button_add");
var incompleteTaskHolder = document.querySelector(".list_incomplete");
var completedTasksHolder = document.querySelector(".list_complete");

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.className = "list__item";

  label.innerText = taskString;
  label.className = "task-text";

  checkBox.type = "checkbox";
  checkBox.className = "checkbox"
  editInput.type = "text";
  editInput.className = "task task-input";

  editButton.innerText = "Edit";
  editButton.className = "button button_edit";

  deleteButton.className ="button button_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "button__img"
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function(){
  console.log("Add Task...");
  //Create a new list item with the text from the .task-input_new:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

//Edit an existing task.
var editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.task-input');
  var label = listItem.querySelector(".task-text");
  var editBtn = listItem.querySelector(".button_edit");
  if(listItem.classList.contains("list__item_edit")){
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("list__item_edit");
}

//Delete task.
var deleteTask = function(){
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function(){
  console.log("Complete Task...");
  //Append the task list item to the .list-complete
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function(){
  console.log("AJAX Request");
}
//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".checkbox");
  var editButton=taskListItem.querySelector(".button_edit");
  var deleteButton=taskListItem.querySelector(".button_delete");
  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksInCompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}