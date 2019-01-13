let todoItems = new TodoItems();

let viewStateArr = ["all", "active", "completed"];
let viewState = viewStateArr[0];

window.onload = () => {
  showAllItem();
  showItemsInfo();
};

function showAllItem() {
  todoItems.getAllItem().forEach(e => renderItem(e));
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
  todoItems.addItem(todoItem);
  renderItem(todoItem);
  showItemsByViewState();
  showItemsInfo();
}

function deleteTodoItem(event) {
  let parentNode = event.target.parentNode;
  let contentNode = parentNode.getElementsByClassName("todo_content")[0];
  let todoItem = todoItems.getItemByContent(contentNode.innerText);
  todoItem.isDeleted = true;
  todoItems.addItem(todoItem);
  todoItems.removeDeletedItem();
  renderDeletedItem(parentNode);
  showItemsInfo();
}

function setTodoItemCompleted(event) {
  let todoItemNode = event.target;
  let todoItem = todoItems.getItemByContent(todoItemNode.innerText);
  todoItem.isCompleted = true;
  todoItems.addItem(todoItem);
  renderSetCompletedItem(todoItemNode);
  showItemsInfo();
}

function setTodoItemActive(event) {
  let todoItemNode = event.target;
  let todoItem = todoItems.getItemByContent(todoItemNode.innerText);
  todoItem.isCompleted = false;
  todoItems.addItem(todoItem);
  renderUndoCompletedItem(todoItemNode);
  showItemsInfo();
}

function refreshView() {
  showItemsByViewState();
  showItemsInfo();
}

function clearCompleted() {
  todoItems.removeDoneItem();
  renderClearCompletedItem();
  refreshView();
}

function showAllTodoList() {
  viewState = viewStateArr[0];
  changeButtonState();
  showItemsByViewState();
  showItemsInfo();
}

function showActiveTodoList() {
  viewState = viewStateArr[1];
  changeButtonState();
  showItemsByViewState();
  showItemsInfo();
}

function showCompletedTodoList() {
  viewState = viewStateArr[2];
  changeButtonState();
  showItemsByViewState();
  showItemsInfo();
}
