const form = document.getElementById('todoForm');
const errorEl = document.getElementById('error');
const taskInput = document.getElementById('taskInput');
const list = document.getElementById('taskList');

let tasks = [];

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) tasks = JSON.parse(saved);
}
loadTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));  
}

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        list.appendChild(li);
    });
}

function addTask(text) {

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = taskInput.value.trim();
    if (!input) {
        errorEl.textContent = "Task cannot be empty!";
        return;
    } else {
        errorEl.textContent = "";
    }
    addTask(input);
    taskInput.value = "";
});

renderTasks();