let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let timer;

renderTasks();

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const timeInput = document.getElementById("timeInput");

    const taskText = taskInput.value.trim();
    const taskTime = parseInt(timeInput.value);

    if (taskText === "" || isNaN(taskTime)) {
        alert("Please enter task and time");
        return;
    }

    tasks.push({
        text: taskText,
        time: taskTime,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    timeInput.value = "";

    renderTasks();
}

function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "list-group-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `

            <div>
                <h5>${task.text}</h5>
                <small>${task.time} mins</small>
            </div>

            <div>

                <button
                    class="btn btn-success btn-sm me-2"
                    onclick="startFocus(${index})">
                    Start
                </button>

                <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="toggleComplete(${index})">
                    Done
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}

function toggleComplete(index) {

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}

function startFocus(index) {

    const focusMode = document.getElementById("focusMode");
    const focusTaskName = document.getElementById("focusTaskName");
    const timerDisplay = document.getElementById("timerDisplay");

    focusMode.classList.remove("d-none");

    focusTaskName.innerText = tasks[index].text;

    let totalSeconds = tasks[index].time * 60;

    updateTimer();

    timer = setInterval(() => {

        totalSeconds--;

        updateTimer();

        if (totalSeconds <= 0) {

            clearInterval(timer);

            alert("Focus Session Completed!");

            closeFocusMode();
        }

    }, 1000);

    function updateTimer() {

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        timerDisplay.innerText =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function closeFocusMode() {

    clearInterval(timer);

    document
        .getElementById("focusMode")
        .classList.add("d-none");
}
