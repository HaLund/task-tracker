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
            let btnDelete = document.createElement("button");
            let btnToggle = document.createElement("button");
            btnDelete.textContent = "Delete";
            btnToggle.textContent = "Mark as complete";
            innerDiv.textContent = "Id: " + task.id + " Task: " + task.name + " Priority: " +  task.priority + " status: " + task.status;
            
            btnDelete.addEventListener("click", () => {
                deleteTask(task);
            });

            btnToggle.addEventListener("click", () => {
                toggleTaskStatus(task);
            });

            innerDiv.appendChild(btnDelete);
            innerDiv.appendChild(btnToggle);
            app.appendChild(innerDiv);
        });
    }
}

    // function toggleTaskStatus(task: Task): void{
    //     if(task === null)
    //     {
    //         return;
    //     }

    //     for(const _task of Tasks){
    //             if(task.id === _task.id){
    //                 _task.status = _task.status === "completed" ? "pending" : "completed";
    //             }
    //         }
    //     }
    //     loadTasks();
    // }   


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

    const json = localStorage.getItem("tasks");

    if(json === null){
        return false;
    }

    const _tasks = JSON.parse(json) as Task[];

    return _tasks.some((_task: Task) => _task.name.toLowerCase() === task.name.toLowerCase());
}

function deleteTask(task: Task): void{
    if(task === null){
        return;
    }
    const json = localStorage.getItem("tasks");
    if(json === null){
        return;
    }
    const _tasks = JSON.parse(json) as Task[];
    const updatedTasks = _tasks.filter((_task: Task) => _task.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
}

loadTasks();