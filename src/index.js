import "./styles.css";
import { addClick, renderToDos } from "./modules/DOM.js";
import { todosArray } from "./modules/createToDo.js";

window.addEventListener("DOMContentLoaded", () => {
    const storedToDos = localStorage.getItem("todoList");

    if (storedToDos) {
        const parsedToDos = JSON.parse(storedToDos);
        parsedToDos.forEach(todo => todosArray.push(todo));
        renderToDos();
    }

    addClick();
});
 