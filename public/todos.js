const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");

function loadTodos() {
    fetch('/todos')
        .then(res => res.json())
        .then(data => {
            todoList.innerHTML = '';
            data.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.task + (todo.done ? " ✅" : "");

                const toggleBtn = document.createElement('button');
                toggleBtn.textContent = todo.done ? "Undo" : "Done";
                toggleBtn.onclick = () => {
                    fetch(`/todos/${todo.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ done: !todo.done })
                    }).then(() => loadTodos());
                };

                const delBtn = document.createElement('button');
                delBtn.textContent = "Delete";
                delBtn.onclick = () => {
                    fetch(`/todos/${todo.id}`, { method: 'DELETE' })
                        .then(() => loadTodos());
                };

                li.appendChild(toggleBtn);
                li.appendChild(delBtn);
                todoList.appendChild(li);
            });
        });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = document.getElementById("task").value;

    fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    }).then(() => {
        todoForm.reset();
        loadTodos();
    });
});

window.addEventListener('DOMContentLoaded', loadTodos);
