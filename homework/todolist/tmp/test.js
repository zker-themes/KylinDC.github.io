let todoList = document.getElementById("todo_lists");

let todoTemplate = document.getElementById("uncompleted_item_template");

let content = todoTemplate.content.querySelector(".todo_content");

content.textContent = "ji";

let clone = document.importNode(todoTemplate.content, true);

todoList.appendChild(clone);

content.textContent = "kk";

clone = document.importNode(todoTemplate.content, true);

todoList.appendChild(clone);

let a = todoList.querySelector(".todo_item");
console.log(a.querySelector(".todo_content").classList[0]);
