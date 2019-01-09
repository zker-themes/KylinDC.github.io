let itemStorage = new ItemStorage();

let todoList = document.getElementById("todo_lists");

let viewStateArr = ["all", "active", "completed"];
let viewState = viewStateArr[0];

window.onload = () => {
  refreshView();
};

function refreshView() {
  showTodoList();
  showItemsInfo();
}

function showTodoList() {
  let todoListHTML = "";
  switch (viewState) {
    case "all":
      todoListHTML = itemStorage.generateAllItemsHTML();
      todoList.innerHTML = todoListHTML;
      break;
    case "active":
      todoListHTML = itemStorage.generateActiveItemsHTML();
      todoList.innerHTML = todoListHTML;
      break;
    case "completed":
      todoListHTML = itemStorage.generateCompletedItemsHTML();
      todoList.innerHTML = todoListHTML;
      break;
    default:
      break;
  }
}

function showItemsInfo() {
  let leftCounter = document.getElementById("left_counter");
  let clearButton = document.getElementById("clear_button");
  let counter = itemStorage.getLeftCount();
  leftCounter.innerText = counter;
  if (counter > 0) {
    clearButton.classList.remove("hidden");
  } else {
    clearButton.classList.add("hidden");
  }
}

function submitTodo(event) {
  let todoInput = document.getElementById("todo_input");
  let todoContent = todoInput.value;
  if (event.keyCode === 13 && todoContent) {
    addTodo(todoContent);
    todoInput.value = "";
  }
}

function addTodo(todoContent) {
  let todoItem = new TodoItem(todoContent);
  itemStorage.addItem(todoItem);
  refreshView();
}

function deleteTodoItem(event) {
  let parentNode = event.target.parentNode;
  let contentNode = parentNode.getElementsByClassName("todo_content")[0];
  let todoItem = itemStorage.getItemByContent(contentNode.innerText);
  todoItem.isDeleted = true;
  itemStorage.addItem(todoItem);
  itemStorage.removeDeletedItem();
  refreshView();
}

function setTodoItemCompleted(event) {
  let todoItemNode = event.target;
  let todoItem = itemStorage.getItemByContent(todoItemNode.innerText);
  todoItem.isCompleted = true;
  itemStorage.addItem(todoItem);
  refreshView();
}

function clearCompleted() {
  itemStorage.removeDoneItem();
  refreshView();
}

function showAllTodoList() {
  viewState = viewStateArr[0];
  changeButtonState();
  showTodoList();
}

function showActiveTodoList() {
  viewState = viewStateArr[1];
  changeButtonState();
  showTodoList();
}

function showCompletedTodoList() {
  viewState = viewStateArr[2];
  changeButtonState();
  showTodoList();
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
