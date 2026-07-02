// import { tasks } from "./types";
import type { Task, TaskPriority } from "./types";
import { saveTasks } from "./storage.js";
import { state, getTaskArray, setTaskArray } from "./types";
import { renderTasks } from "./render.js";
import { taskInput, priorityInput } from "./main.js";

export function addTask(name: string, priority: TaskPriority): void {
    const newTask: Task = {
        id: state.nextId,
        name,
        status: "pending",
        priority
    };

    // tasks.push(newTask);
    getTaskArray().push(newTask);

    state.nextId++;

    saveTasks();
    
    clearForm();
}

export function toggleTask(id: number): void {
    for (const task of getTaskArray()) {
        if (task.id === id) {
            task.status = task.status === "pending" ? "completed" : "pending";
        }
    }

    saveTasks();

    renderTasks();
}


export function deleteTask(id: number): void {
    setTaskArray(getTaskArray().filter((task) => task.id !== id)); 

    saveTasks();

    renderTasks();
}

function clearForm(): void {
    taskInput.value = "";
    priorityInput.value = "medium";
}