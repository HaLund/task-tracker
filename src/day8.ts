let addButton = document.querySelector("#add-button") as HTMLButtonElement;
let statisticsButton = document.querySelector("#statistics-button");
let priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
let statusInput = document.querySelector("#status") as HTMLSelectElement;
let app = document.querySelector("#app");
let btnToogle = document.querySelector("#btnToogle") as HTMLButtonElement;

type Task = {
    id: number;
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

addButton.addEventListener("click", () =>
{
    const _nameInput = document.getElementById("task-input") as HTMLInputElement | null;
    let _name = _nameInput?.value ?? "";
    const _priority = priorityInput.value as "low" | "medium" | "high";
    const _status = statusInput.value as "pending" | "completed";

    let taskOne: Task = {
        id: tasks.length,
        name: _name.trim(),
        priority: _priority,
        status: _status
    }

    if (_nameInput) {
        _nameInput.value = "";

        if(_name === "")
        {
            let innerDiv = document.createElement("div");
            //innerDiv.innerHTML ="";
            innerDiv.innerText = "Fältet är tomt.";
            innerDiv.style="color:red;";

            let errorMsg = innerDiv.innerText;
            //if(errorMsg != "Fältet är tomt.")
            //{
                app?.appendChild(innerDiv);
            //}
            return;
        }
        
    }

    tasks.push(taskOne);
    
    renderTasks(); 
})

statisticsButton?.addEventListener("click", () =>
{
    showStatistics();
})

// btnToogle.addEventListener("click", () =>
// {
//     btnToogle.textContent === "Completed" ? "Pending" : "Completed";
//     btnToogle.style ="color:red;";
// })

// function toggleTask(): void {
//     for (const task of tasks) {
//         if (task.name === id) {
//             task.status = task.status === "pending" ? "completed" : "pending";
//         }
//     }
//     renderTasks();
// }

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

function deleteTask(id: number): void{
    // find the index of the task with the given id and remove it
    const idx = tasks.findIndex(task => task.id === id);
    if (idx !== -1) {
        tasks.splice(idx, 1);
        renderTasks();
    }
}

function toggleTask(id: number): void{
        for(const task of tasks){
            if(task.id === id){
                task.status = task.status === "completed" ? "pending" : "completed";
            }
        }

        renderTasks();
    }

    function showStatistics(): void {
        const statisticsDiv = document.createElement("div");

        statisticsDiv.innerText = `Total tasks: ${tasks.length} Completed: ${tasks.filter(m => m.status === "completed").length} Pending: ${tasks.filter(m => m.status === "pending").length} `; //"Total tasks: " + tasks.length.toString();

        app?.appendChild(statisticsDiv);
    }
