console.log("Hello TypeScript!!");

const taskName:string = "Learn TypeScript";
console.log(taskName);
const priority: number =1;
const completed:boolean =true;

const taskName2:string="Learch C#";
const priority2:number=2;
const completed2=true;

const taskName3:string="Learn Ruby";
const priority3:number=3
const completed3:boolean=false;

const completedTasks:number=1;
const totalTasks:number=3;
const completionRate=completedTasks/totalTasks*100;

console.log(`
Task: ${taskName}
Priority: ${priority}
Completed: ${completed}
`);

console.log(`
Task: ${taskName2}
Priority: ${priority}
Completed: ${completed2}
`);

console.log(`
    Task: ${taskName3}
    Priority: ${priority}
    Completed: ${completed}
`);

console.log(`
        completionRate: ${completionRate}%
    `
);