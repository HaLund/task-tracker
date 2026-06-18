function writeHeader() 
{
    console.log("==================================");
    console.log("Task Tracker");
    console.log("==================================");
}  

const tasks = [
    "Lära mig TS",
    "Träna",
    "Handla",
    "Tvätta",
    "Plugga"
];

function getTasks():void
{
    for(let i=0; i < tasks.length; i++)
    {
        console.log(tasks[i]);
    }
}

function getAmountOfTasks() 
{
    console.log(`Antal tasks: ${tasks.length}`);
}

function addTask(task:string)
{
    tasks.push(task);
}

writeHeader();
getTasks();
getAmountOfTasks();
addTask("Gå och fiska");
getTasks();
getAmountOfTasks();