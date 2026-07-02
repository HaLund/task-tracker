export type Task = {
    id: number;
    name: string;
    status: "pending" | "completed";
    priority: "low" | "medium" | "high";
};

export type TaskPriority = "low" | "medium" | "high";

export const app = document.querySelector("#app");

let tasks: Task[] = [];

export function getTaskArray() {
    return tasks;
}

export function setTaskArray(newTasks: Task[]) {
    tasks = newTasks;
}

// export const taskArray = {
//     tasks: []
// }

// export let nextId = 1;

export const state = {
    nextId: 1,
}