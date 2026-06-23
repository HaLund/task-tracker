type Task = {
    name: string;
    status: "pending" | "completed";
    priority: "low" | "medium" | "high";
    description?: string;
    notes?: string;
};

const tasks:Task[]=[];
enum taskStatusType
{
    pending = "pending",
    completed = "completed"
}

enum taskPriorities
{
    low = "low",
    medium = "medium",
    high = "high"
}

function addTask(task: Task): void
{
    tasks.push(task);
}

function showTasks(): void
{
    tasks.forEach(task => {
        console.log(`name: ${task.name} status: ${task.status} priority: ${task.priority} description: ${task.description} notes: ${task.notes}`);
    });
}

function showPendingTasks(): void
{
    let _tasks = tasks.filter(m => m.status === taskStatusType.pending);

    _tasks.forEach(task => {
        console.log(`Pending task: ${task.name} Priority: ${task.priority}`);
    });
}

function showCompletedTasks(): void
{
    let _tasks = tasks.filter(m => m.status === taskStatusType.completed);

    _tasks.forEach(task => {
        console.log(`Completed task: ${task.name} Priority: ${task.priority}`);
    });
}

function showTasksByPriorities(priority: taskPriorities): void
{
    let filteredTasks = tasks.filter(m => m.priority === priority);

    filteredTasks.forEach(task => {
        console.log(`Task: ${task.name} Task status: ${priority}`);
    });
}

const taskOne: Task =
{
    name: "Städa",
    status: taskStatusType.pending,
    priority: taskPriorities.medium,
    description: "Very fun",
    notes: "Clean all house",
}

const taskTwo: Task =
{
    name: "Plugga TypeScript",
    status: taskStatusType.completed,
    priority: taskPriorities.high,
    description: "Gör alla dagens övningar",
    notes: "Prova olika lösningar"
}

const taskThree: Task =
{
    name: "Klipp gräset",
    status: taskStatusType.pending,
    priority: taskPriorities.low,
    description: "Klipp gräset, glöm inte maskrosorna",
    notes: "Kompleetera med trimmern"
}

function completeTask(_tasks: Task): void
{
    let filteredTask = tasks.find(m => m.name === _tasks.name);
    if (filteredTask) {
        filteredTask.status = taskStatusType.completed;
    }
}

addTask(taskOne);
addTask(taskTwo);
addTask(taskThree);
showTasks();
showPendingTasks();
showCompletedTasks();

console.log(`Tasks med låg prioritet:`);
showTasksByPriorities(taskPriorities.low);

console.log(`Tasks med medium prioritet:`);
showTasksByPriorities(taskPriorities.medium);

console.log(`Tasks med hög prioritet:`);
showTasksByPriorities(taskPriorities.high);

completeTask(taskOne);
showCompletedTasks();

