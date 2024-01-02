// Selectors
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoElement = document.querySelector(".todo-element");
const removeButton = document.querySelector(".delete-btn");
const editButton = document.querySelector(".edit-btn");
const closeModal = document.querySelector('[data-modal-toggle="updateProductModal"]');
const modal = document.getElementById('updateProductModal');
const modalInput = document.getElementById('name');
const modalDescription = document.getElementById('description');

let todoId;

// Event Listeners

// add todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodoRequest();
});

// complete todo
todoList.addEventListener('click', (e) => {
  const element = e.target;
  if (element.classList.contains('todo-text')) {
    const parent = element.parentElement.parentElement;
    const id = parent.dataset.id;
    element.classList.toggle('true');
    updateTodoStatusRequest(id)
  }
});

// open edit todo modal
todoList.addEventListener('click', async (e) => {
  const element = e.target;
  if (element.classList.contains('edit-btn')) {
    const parent = element.parentElement;
    todoId = parent.dataset.id;
    const todo = await getSingleTodoRequest(todoId);

    modalInput.value = todo.text;
    modalDescription.value = todo.description;
    modal.classList.toggle('hidden');
  }
});
// edit todo
modal.addEventListener('submit', async (e) => {
  e.preventDefault();
  await updateTodoRequest(todoId);

  modal.classList.toggle('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.toggle('hidden');
});

//delete todo
todoList.addEventListener('click', (e) => {
  const element = e.target;

  if (element.classList.contains('delete-btn')) {
    const parent = element.parentElement;
    const id = parent.dataset.id;
    parent.remove();
    deleteTodoRequest(id);
  }
});

// Functions
function addTodo() {

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("flex", "mb-4", "items-center", "todo-element");
  todoDiv.setAttribute("data-id", todoId);

  const todoP = document.createElement("p");
  todoP.innerText = todoInput.value;
  todoP.classList.add("false", "todo-text", "text-align-l", "w-full", "text-grey-600");
  todoP.setAttribute("type", "button");

  const todoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  todoPath.setAttribute("stroke-linecap", "round");
  todoPath.setAttribute("stroke-linejoin", "round");
  todoPath.setAttribute("stroke-width", "2");
  todoPath.setAttribute("d", "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z");
  todoPath.setAttribute("fill", "none");

  const todoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  todoSvg.classList.add("h-6", "w-6", "text-black");
  todoSvg.setAttribute("fill", "none");
  todoSvg.setAttribute("viewBox", "0 0 24 24");
  todoSvg.setAttribute("stroke", "currentColor");
  todoSvg.appendChild(todoPath);

  const doneButton = document.createElement("button");
  doneButton.classList.add("w-full");
  doneButton.appendChild(todoP);

  const descriptionButton = document.createElement("button");
  descriptionButton.classList.add("hidden", "description-btn", "ml-4", "mr-2");
  descriptionButton.appendChild(todoSvg);
  
  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn", "flex-no-shrink", "p-2", "ml-6", "mr-2", "bg-transparent", "hover:bg-blue-500", "text-blue-700", "font-semibold", "hover:text-white", "py-2", "px-4", "border", "border-blue-500", "hover:border-transparent", "rounded");
  editButton.appendChild(document.createTextNode("Edit"));

  const removeButton = document.createElement("button");
  removeButton.classList.add("delete-btn", "flex-no-shrink", "p-2", "ml-2", "bg-transparent", "hover:bg-red-500", "text-red-700", "font-semibold", "hover:text-white", "py-2", "px-4", "border", "border-red-500", "hover:border-transparent", "rounded");
  removeButton.appendChild(document.createTextNode("Remove"));
  

  todoDiv.appendChild(doneButton);
  todoDiv.appendChild(descriptionButton);
  todoDiv.appendChild(editButton);
  todoDiv.appendChild(removeButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function addTodoRequest() {
  const url = 'http://localhost:3000/api/todo/new';
  const existingTodos = todoList.querySelectorAll('.todo-element button > p');
  const text = todoInput.value;
  const isDuplicate = Array.from(existingTodos).some(todo => todo.textContent === text);
  const data = { text };

  if (isDuplicate) {
    alert("This todo already exists in the list.");
    return;
  }

  if (text === '') {
    return;
  }

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

function getSingleTodoRequest(id) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3000/api/todo/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
function updateTodoRequest(id) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3000/api/todo/edit/${id}`;
    const data = {
      text: modalInput.value,
      description: modalDescription.value
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateTodoStatusRequest(id) {
  const url = `http://localhost:3000/api/todo/complete/${id}`;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => {
      console.log('Response:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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