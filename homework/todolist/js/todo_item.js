class TodoItem {
  constructor(content, isCompleted = false, isDeleted = false) {
    this.content = content;
    this.isCompleted = isCompleted;
    this.isDeleted = isDeleted;
  }

  setCompleted() {
    this.isCompleted = true;
  }

  setUncompleted() {
    this.isCompleted = false;
  }

  delet() {
    this.isDeleted = true;
  }

  generateItemHTML() {
    if (this.isCompleted) {
      return `<div class="todo_item" ">
      <div class="checked_icon"></div>
      <div class="todo_content done_content">${this.content}</div>
      <div class="delete_icon hidden" onclick="deleteTodoItem(event)"></div>
    </div>`;
    } else {
      return `<div class="todo_item" onclick="setTodoItemCompleted(event)">
      <div class="uncheck_icon"></div>
      <div class="todo_content">${this.content}</div>
      <div class="delete_icon hidden" onclick="deleteTodoItem(event)"></div>
    </div>`;
    }
  }
}
