// Section 2: App State Variables
let tasks = [];

// Section 3: Cached Element References
const taskForm = document.getElementById("taskForm");
const taskTable = document.querySelector("#taskTable tbody");

// Section 4: Functions and Event Listeners
// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault(); // Stops the form from refreshing the page

    // Get form input values
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    // Validate input fields
    if (taskName === "" || taskDeadline === "") {
        alert('Task name and deadline are required!');
        return;
    }

    // Update the tasks array with the new task
    tasks.push({
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline
    });

    // Clear the form
    taskForm.reset();

    // Render the updated task list
    render();
}

// Function to render tasks in the table
function render() {
    taskTable.innerHTML = tasks.map((task, index) => `
        <tr>
            <td>${task.name}</td>
            <td>${task.description || 'No description'}</td>
            <td>${task.deadline}</td>
            <td><button onclick="markTaskComplete(${index})">Complete</button></td>
            <td><button onclick="removeTask(${index})">Remove</button></td>
        </tr>
    `).join('');
}

// Function to mark a task as complete
function markTaskComplete(index) {
    const row = taskTable.rows[index];
    row.style.textDecoration = 'line-through';
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    render(); // Re-render the table
}

// Initialize the table
function init() {
    taskTable.innerHTML = ''; // Clear the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function to update the table
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();
