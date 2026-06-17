const tasks = [
    "Lära mig TS",
    "Träna",
    "Handla",
    "Tvätta",
    "Plugga"
];


console.log("====================");
console.log("Task tracker");
console.log("====================");

for(let i=0; i<tasks.length; i++)
{
    console.log(`Uppgift ${i}: ${tasks[i]}`);
}

console.log(`Antal uppgifter: ${tasks.length}`);