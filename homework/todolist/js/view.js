let todoList = document.getElementById("todo_lists");

function cleanTodoList() {
  let todoItemElements = todoList.querySelectorAll(".todo_item");
  todoItemElements.forEach(e => todoList.removeChild(e));
}

function renderItem(todoItem) {
  let todoTemplate;
  if (todoItem.isCompleted) {
    todoTemplate = document.getElementById("completed_item_template");
  } else {
    todoTemplate = document.getElementById("active_item_template");
  }
  let content = todoTemplate.content.querySelector(".todo_content");
  content.textContent = todoItem.content;
  let clone = document.importNode(todoTemplate.content, true);
  todoList.appendChild(clone);
}

function renderDeletedItem(parentNode) {
  todoList.removeChild(parentNode);
}

function renderSetCompletedItem(target) {
  let parentNode = target.parentNode;

  target.setAttribute("onclick", "setTodoItemActive(event)");
  parentNode.classList.add("done_item");

  let checkIcon = parentNode.querySelector(".uncheck_icon");
  checkIcon.setAttribute("class", "checked_icon");

  let content = parentNode.querySelector(".todo_content");
  content.classList.add("done_content");
}

function renderUndoCompletedItem(target) {
  let parentNode = target.parentNode;
  target.setAttribute("onclick", "setTodoItemCompleted(event)");
  parentNode.classList.remove("done_item");
  let checkIcon = parentNode.querySelector(".checked_icon");
  checkIcon.setAttribute("class", "uncheck_icon");

  let content = parentNode.querySelector(".todo_content");
  content.classList.remove("done_content");
}

function showItemsInfo() {
  let leftCounter = document.getElementById("left_counter");
  let clearButton = document.getElementById("clear_button");
  let activeCounter = todoItems.getActiveCount();
  leftCounter.innerText = activeCounter;
  if (todoItems.getCompletedCount() > 0 && !(viewState === "active")) {
    clearButton.classList.remove("hidden");
  } else {
    clearButton.classList.add("hidden");
  }
}

function renderClearCompletedItem() {
  let todoItemElements = Array.from(todoList.querySelectorAll(".todo_item"));
  let completeItemElements = todoItemElements.filter(e =>
    e.classList.contains("done_item")
  );
  completeItemElements.forEach(e => todoList.removeChild(e));
}

function showItemsByViewState() {
  let todoItemElements = Array.from(todoList.querySelectorAll(".todo_item"));
  let completeItemElements = todoItemElements.filter(e =>
    e.classList.contains("done_item")
  );
  let activeItemElements = todoItemElements.filter(
    e => !e.classList.contains("done_item")
  );
  switch (viewState) {
    case "all":
      todoItemElements.forEach(e => e.classList.remove("conceal"));
      break;
    case "active":
      activeItemElements.forEach(e => e.classList.remove("conceal"));
      completeItemElements.forEach(e => e.classList.add("conceal"));
      break;
    case "completed":
      completeItemElements.forEach(e => e.classList.remove("conceal"));
      activeItemElements.forEach(e => e.classList.add("conceal"));
      break;
    default:
      break;
  }
}

function changeButtonState() {
  let allButton = document.getElementById("all_button");
  let activeButton = document.getElementById("active_button");
  let completedButton = document.getElementById("completed_button");

  switch (viewState) {
    case "all":
      allButton.classList.add("selected_button");
      activeButton.classList.remove("selected_button");
      completedButton.classList.remove("selected_button");
      break;
    case "active":
      allButton.classList.remove("selected_button");
      activeButton.classList.add("selected_button");
      completedButton.classList.remove("selected_button");
      break;
    case "completed":
      allButton.classList.remove("selected_button");
      activeButton.classList.remove("selected_button");
      completedButton.classList.add("selected_button");
      break;
    default:
      break;
  }
}
