const taskName = document.querySelector("#task-input") as HTMLInputElement;
const form = document.querySelector("#task-form") as HTMLFormElement;
const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;
const app = document.querySelector("#app");
const priority = document.querySelector("#priority-input") as HTMLSelectElement;

form?.addEventListener("submit", handleSubmit);

type Task = { 
    id: number,
    name: string,
    status: "pending" | "completed",
    priority: "low" | "medium" | "high"
}

function handleSubmit(event: SubmitEvent): void{
    event.preventDefault();
    const _task: Task = {
        id: 1,
        name: taskName.value.trim(),
        priority: priority.value as "low" | "medium" | "high",
        status: "pending"
    };

    errorMessage.textContent = "";
    saveTasks(_task);
    loadTasks();
}

let Tasks: Task[] = [];

function loadTasks()
{
    const json = localStorage.getItem("tasks");

    if(json === null)
        {
        return;
    }

    Tasks = JSON.parse(json);

    if (app) {
        app.innerHTML = "";
        Tasks.forEach(task => {
            let innerDiv = document.createElement("div");
            innerDiv.textContent = "Id: " + task.id + " Task: " + task.name + " Prioritet: " +  task.priority + " status: " + task.status;
            app.appendChild(innerDiv);
        });
    }
}

function saveTasks(task: Task): void{
    if(task === null)
    {
        return;
    }

    if(taskExists(task)){ 
        if (errorMessage) {
            errorMessage.textContent = "A task with the same name already exists.";
            return;
        }
    }

     const jsonTasks = localStorage.getItem("tasks");
     if(jsonTasks){
        const parsedTasks = JSON.parse(jsonTasks ?? "") as typeof Tasks;
        task.id = parsedTasks.length;
        parsedTasks.push(task);
        const jsonTasksNew = JSON.stringify(parsedTasks);

        localStorage.setItem(
            "tasks", jsonTasksNew
        );
    }
    else{
        task.id = Tasks.length;
        Tasks.push(task);
        const jsonTasksNew = JSON.stringify(Tasks);

        localStorage.setItem(
            "tasks", jsonTasksNew
        );
    }

    loadTasks();
}

function taskExists(task: Task) : boolean{
    if(task === null){
        return false;
    }

    const _taskExists = false; 

    //const storedTask = localStorage.getItem("task");
    //const storedTasks = localStorage.getItem("tasks");
    
    //const json = JSON.parse(storedTask ?? "") as Task;
    //const parsedTasks = JSON.parse(storedTasks ?? "") as typeof Tasks;
    const json = localStorage.getItem("tasks");

    if(json === null){
        return false;
    }

    Tasks = JSON.parse(json);

    Tasks.forEach(_task => {
        if(_task.name === task.name){
            return true;
        }
    });

    return _taskExists;
}

loadTasks();