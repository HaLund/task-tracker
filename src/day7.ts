const app = document.querySelector("#app");

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

function addTask(task: Task): void
{
    tasks.push(task);
}

function showTasks(): void
{
    tasks.forEach(task => {
        //console.log(`name: ${task.name} status: ${task.status} priority: ${task.priority} description: ${task.description} notes: ${task.notes}`);
        const app = document.getElementById("app");

        if (app) {
            app.innerHTML = "name: ${task.name} status: ${task.status} priority: ${task.priority} description: ${task.description} notes: ${task.notes}";
            app.innerHTML ="testar";
        }
    });
}

addTask(taskOne);
addTask(taskTwo);
addTask(taskThree);
showTasks();

const title = document.querySelector("#title") as HTMLHeadingElement;
title.textContent = "Mina Tasks";

//const app = document.querySelector("#app");

function renderTasks(): void
{
    if (!app) return;

    app.innerHTML = "";
    tasks.forEach(task => {
        //lägger till genom innerHtml:
        //app.innerHTML = `name: ${task.name} status: ${task.status} priority: ${task.priority} description: ${task.description} notes: ${task.notes}`;

        //testar appendChild:
        // const newDiv = document.createElement("div");
        // newDiv.innerHTML = `name: ${task.name} status: ${task.status} priority: ${task.priority} description: ${task.description} notes: ${task.notes}`;
        // app.appendChild(newDiv);

        const newDiv = document.createElement("div");
        newDiv.textContent = `name: ${task.name} status: ${task.status} priority: ${task.priority} description: ${task.description} notes: ${task.notes}`;
        app.appendChild(newDiv);

    });
}

renderTasks();