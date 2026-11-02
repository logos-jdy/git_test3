// HTML 요소를 가져옵니다.
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");

// 폼이 제출되면 새로운 할 일을 추가합니다.
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  // 입력값이 비어 있으면 추가하지 않습니다.
  if (todoText === "") {
    todoInput.focus();
    return;
  }

  addTodo(todoText);
  todoInput.value = "";
  todoInput.focus();
});

// 할 일 항목을 화면에 만듭니다.
function addTodo(text) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", "완료 표시");

  const todoLabel = document.createElement("span");
  todoLabel.className = "todo-text";
  todoLabel.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "삭제";
  deleteButton.setAttribute("aria-label", text + " 삭제");

  // 체크박스 상태에 따라 완료 스타일을 적용합니다.
  checkbox.addEventListener("change", function () {
    listItem.classList.toggle("completed", checkbox.checked);
  });

  // 삭제 버튼을 누르면 해당 항목을 제거합니다.
  deleteButton.addEventListener("click", function () {
    listItem.remove();
    updateEmptyMessage();
  });

  listItem.append(checkbox, todoLabel, deleteButton);
  todoList.appendChild(listItem);
  updateEmptyMessage();
}

// 목록이 비었는지 확인해 안내 문구를 표시합니다.
function updateEmptyMessage() {
  emptyMessage.hidden = todoList.children.length > 0;
}
