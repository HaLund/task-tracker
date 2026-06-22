type task = {
    name?: string;
    completed:boolean;
    priority?:number;
}

const tasks:task[]=[]
{};

function showHeader(header:string): void
{
    console.log(`Your header is: $[header]`);
}

function showTasks(): void
{
    tasks.forEach(task => {
        console.log(`Name: ${task.name} Completed: ${task.completed} Priority: ${task.priority}`);
    });
}

function addTask(task:task): void
{
    //tasks.map(m =>m.name);
    tasks.push(task);
}

const taskOne: task =
{
    name: "Städa",
    completed: false,
    priority: 1
};

addTask(taskOne);

const taskTwo: task =
{
    name: "Plugga",
    completed: false,
    priority: 2
}

addTask(taskTwo);

const taskThree: task =
{
    name: "Siesta",
    completed: true,
    priority: 3
}

function showCompletedTasks(): void
{
    tasks.forEach(task => {
        if(task.completed)
        {
            console.log(`Avklarad rask: ${task.name}`);
        }
    });
}

function showPendingTasks(): void
{
    tasks.forEach(task => {
        if(!task.completed)
        {
            console.log(`Ej avklarad task: ${task.name}`);
        }
    });
}

function completeTask(task: task): void
{
    for(let i=0; i < tasks.length; i++)
    {
        if(task.name == tasks[i]?.name)
        {
            tasks[i] = task;
        }
    };
}

addTask(taskThree);
showTasks();
showCompletedTasks();
showPendingTasks();

const completedTask: task =
{
    name: "Plugga",
    completed: true
}

completeTask(completedTask);

function showStatistics(): void
{
    let amountOfFinishedTasks = 0;
    let amountOfPendingTasks = 0;
    console.log(`Antal tasks: ${tasks.length}`);
    
    tasks.forEach(task => {
        if(task.completed)
        {
            amountOfFinishedTasks ++;
        }
        else
        {
            amountOfPendingTasks ++;
        }
    });

    console.log(`Antal avklarade tasks: ${amountOfFinishedTasks}`);
    
    console.log(`Antal ej avklarade tasks: ${amountOfPendingTasks}`);
}

showStatistics();