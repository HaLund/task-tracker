const taskName = document.querySelector("#task-input") as HTMLInputElement;
const form = document.querySelector("#task-form") as HTMLFormElement;
const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;// document.getElementById("#error-message");
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

// localStorage.setItem(
//     "name", "Jane"
// );

// localStorage.setItem(
//     "city", "NY"
// );

// const name = localStorage.getItem("name");

// localStorage.removeItem("name");

// localStorage.clear();

// const runner = {
//     "name": "Bill",
//     "pace": "5:10"
// };

// const json = JSON.stringify(runner);

// localStorage.setItem(
//     "runner",
//     json
// );

// const runner2 = localStorage.getItem("runner");
// console.log(runner2);

// if (runner2 === null) {
//     throw new Error("Runner data not found");
// }

// const runnerObject = JSON.parse(runner2);

function loadTasks()
{
    //const json = localStorage.getItem("task");
    const json = localStorage.getItem("tasks");

    if(json === null)
        {
        return;
    }

    Tasks = JSON.parse(json);
    //const task = JSON.parse(json) as Task;

    // Set app text content if available. Optional chaining cannot be used on the left side of an assignment.
    if (app) {
        //app.textContent = task.name;// Tasks[0]?.name ?? "";
        // Tasks.forEach(task => {
        //     app.textContent += task.name;
        // });
    }
}

function saveTasks(task: Task): void{
    if(task === null)
    {
        return;
    }

    //denna kod gör att det kraschar
    // if(taskExists(task)){ d
    //     if (errorMessage) {
    //         errorMessage.textContent = "A task with the same name already exists.";
    //         return;
    //     }
    // }

     const jsonTasks = localStorage.getItem("tasks");
     if(jsonTasks){
        const parsedTasks = JSON.parse(jsonTasks ?? "") as typeof Tasks; //denna rad gjorde att det kraschar utan null-check, ej testat raderna under
        parsedTasks.push(task);
        const jsonTasksNew = JSON.stringify(parsedTasks);

        localStorage.setItem(
        "tasks", jsonTasksNew
    );
    }//nu kraschar det inte längre (efter null--check. Härnästa)
    else{
        Tasks.push(task);
        const jsonTasksNew = JSON.stringify(Tasks);

        localStorage.setItem(
        "tasks", jsonTasksNew
    );
    }

    //toDo: hämta ut json-taskobjektet, parsa til Task[]-objekt, populera app.Context med alla tasks

    // if (app) {
    //     app.textContent = "testar";
    // }

    //const jsonTasks = JSON.stringify(tasks);

    // const json = JSON.stringify(task);

    // Tasks.push(task);
    // const json2 = JSON.stringify(Tasks);

    // // localStorage.setItem(
    // //     "task", json
    // // );

    // localStorage.setItem(
    //     "tasks", json2
    // );
}

function taskExists(task: Task) : boolean{
    if(task === null){
        return false;
    }

    const _taskExists = false; // (localStorage.getItem("task") ?? "").length > 0;

    // if(!_taskExists){
    //     return false;
    // }

     const storedTask = localStorage.getItem("task");
     const storedTasks = localStorage.getItem("tasks");

    
    // if (!_taskExists) {
    //     return false;
    // }
    
    const json = JSON.parse(storedTask ?? "") as Task;
    const parsedTasks = JSON.parse(storedTasks ?? "") as Task[];

    parsedTasks.forEach(_task => {
        if(_task.name === task.name){
            return true;
        }
    });

    // if(json.name === task.name){
    //     return true;
    // }

    return _taskExists;
}

loadTasks();