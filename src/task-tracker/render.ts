import { app, getTaskArray } from "./types";
import { toggleTask, deleteTask } from "./tasks";

export function renderTasks(): void {
    if (app) {
        app.innerHTML = "";
    }

    for (const task of getTaskArray()) {
        const card = document.createElement("div");
        card.classList.add("task");

        if (task.priority === "high") {
            card.classList.add("high-priority");
        }

        if (task.status === "completed") {
            card.classList.add("completed");
        }
       
        const title = document.createElement("h3");
        title.textContent = task.name;

        const status = document.createElement("p");
        status.textContent = `Status: ${task.status}`

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${task.priority}`;

        const completeButton = document.createElement("button");
        completeButton.classList.add("btn");
        completeButton.textContent = task.status === "pending" ? "Complete" : "Undo";
        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        })

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        })

        card.append(
            title,
            status,
            priority,
            completeButton,
            deleteButton
        );

        app?.append(card);
    } 
}