import { getTaskArray, setTaskArray } from "./types";

export function saveTasks(): void {
    const json = JSON.stringify(getTaskArray());

    localStorage.setItem(
        "tasks",
        json
    );
}


export function loadTasks(): void {
    const json = localStorage.getItem("tasks");

    if (json === null) {
        return;
    }

    // tasks = JSON.parse(json);
    setTaskArray(JSON.parse(json))
}