const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoElement = document.querySelector(".todo-element");
const removeButton = document.querySelector(".delete-btn");

function addTodo() {

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("flex", "mb-4", "items-center", "todo-element");
  todoDiv.setAttribute("data-id", todoId);

  const todoP = document.createElement("p");
  todoP.innerText = todoInput.value;
  todoP.classList.add("false", "w-full", "text-grey-600");

  const todoBtnDone = document.createElement("button");
  todoBtnDone.classList.add("done-btn", "flex-no-shrink", "p-2", "ml-4", "mr-2", "bg-transparent", "hover:bg-green-500", "text-green-700", "font-semibold", "hover:text-white", "py-2", "px-4", "border", "border-green-500", "hover:border-transparent", "rounded");
  todoBtnDone.appendChild(document.createTextNode("Done"));

  const todoBtnRemove = document.createElement("button");
  todoBtnRemove.classList.add("delete-btn", "flex-no-shrink", "p-2", "ml-2", "bg-transparent", "hover:bg-red-500", "text-red-700", "font-semibold", "hover:text-white", "py-2", "px-4", "border", "border-red-500", "hover:border-transparent", "rounded");
  todoBtnRemove.appendChild(document.createTextNode("Remove"));
  todoP.setAttribute("type", "button");

  todoDiv.appendChild(todoP);
  todoDiv.appendChild(todoBtnDone);
  todoDiv.appendChild(todoBtnRemove);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

let todoId;
let todoStatus;

function addTodoRequest() {
  const url = 'http://localhost:3000/api/todo/new';
  const text = todoInput.value;
  const data = { text };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log('Response:', result);
      todoId = result._id;
      addTodo();
    })
    .catch(error => {
    console.error('Error:', error);
  })
}

function deleteTodoRequest(id) {
  const url = `http://localhost:3000/api/todo/delete/${id}`;

  fetch(url, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(result => {
    console.log('Response:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodoRequest();
});

function updateTodoStatusRequest(id) {
  const url = `http://localhost:3000/api/todo/complete/${id}`;

  const data = { complete: !todoStatus };

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log('Response:', result);
      todoStatus = result.complete;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function removeTodo() {
  todoList.addEventListener('click', (e) => {
    const element = e.target;

    if (element.classList.contains('delete-btn')) {
      const parent = element.parentElement;
      const id = parent.dataset.id;
      parent.remove();
      deleteTodoRequest(id);
    }
  });
}

removeTodo();

function updateTodoStatus() {
  todoList.addEventListener('click', (e) => {
    const element = e.target;

    if (element.classList.contains('done-btn')) {
      const parent = element.parentElement;
      const id = parent.dataset.id;
      const pElement = element.parentElement.querySelector('p');
      pElement.classList.toggle('true');
      updateTodoStatusRequest(id)
    }

  });
}

updateTodoStatus();
