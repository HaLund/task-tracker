const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
const form = document.querySelector("#task-form") as HTMLFormElement;
let app = document.querySelector("#app");
//let errorMesssage = document.querySelector<HTMLTextAreaElement>("#error-message");

const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;
let errsMsg = "";

type TaskPriority = "low" | "medium" | "high";

type TaskStatus = "pending" | "completed";

let tasks: Task[] = [];
let nextId = 1;

type Task = {
    id: number;
    name: string;
    status: TaskStatus;
    priority: TaskPriority;
}

form.addEventListener("submit", handleSubmit);

function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    //const task_name_value = taskInput?.value ?? "";

    const taskName = taskInput.value.trim();
    const priority = priorityInput.value as TaskPriority;
    const error = validateTaskName(taskName);
    // if(!validInput(task_name_value)){
    //     if (errorMessage) {
    //         errorMessage.textContent = errsMsg + "test";
    //     }
    // }

    if (error !== "") {
        errorMessage.textContent = error;
        return;
    }

     errorMessage.textContent = "";

     addTask(taskName, priority);
     renderTasks();
}

function validateTaskName(name: string): string {
    if (name === "") return "Task name is required"

    if (name.length < 3) {
        return "Task name must be at least 3 characters."
    }

    if (name.length > 40) {
        return "Task name cannot be longer than 40 characters."   
    }

    if (taskExists(name)) {
        return "Task name with that name already exists."
    }

    return "";
}

function taskExists(name: string): boolean {
    for (const task of tasks) {
        if (task.name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }

    return false;
}


function clearForm(): void {
    taskInput.value = "";
    priorityInput.value = "medium";
}

function addTask(name: string, priority: TaskPriority): void {
    const newTask: Task = {
        id: nextId,
        name,
        status: "pending",
        priority
    };

     tasks.push(newTask);
    nextId++;
        
    clearForm();
}

function renderTasks(): void{
    if(!app)
        return;

    app.innerHTML = "";

    tasks.forEach(task => {
        let innerDiv = document.createElement("div");
        let btnDelete = document.createElement("button");
        let btnComplete = document.createElement("button");
        
        innerDiv.innerText = `Namn: ${task.name} Prioritet: ${task.priority}`;
        btnComplete.textContent = task.status;
        btnDelete.textContent = "delete";

        if(task.priority === "high"){
            innerDiv.classList.add("high-priority");
        }

        btnComplete.addEventListener("click", () =>
        {
            toggleTask(task.id);
        })
        
        btnDelete.addEventListener("click", () =>
        {
            btnDelete.textContent = "Delete";
            deleteTask(task.id);
        })

        app.appendChild(innerDiv);
        app.appendChild(btnComplete);
        app.appendChild(btnDelete);
    });
}

function toggleTask(id: number): void{
        for(const task of tasks){
            if(task.id === id){
                task.status = task.status === "completed" ? "pending" : "completed";
            }
        }

        renderTasks();
    }

    function deleteTask(id: number): void{
    // find the index of the task with the given id and remove it
    const idx = tasks.findIndex(task => task.id === id);
    if (idx !== -1) {
        tasks.splice(idx, 1);
        renderTasks();
    }
}


// function validInput(value: string): boolean{
//     if(value !== "") {
//         const tempVal = value.trim();

//         if(tempVal.length < 3){
//             errsMsg = "Name must contain at least 3 characters.";
//             return false;
//         } else if(tempVal.length > 40){
//             errsMsg = "Name can contain max 40 characters.";
//             return false;
//         }
//     } else {
//         errsMsg = "Name is mandatory.";
//         return false;
//     }

//     return true;
// }