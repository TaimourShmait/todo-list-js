import { ToDo } from "./todo.js";
import { renderToDos } from "./DOM.js";

const todosArray = [];

export function createToDo (title, description, priority) {

    console.log("3- createToDo function triggered!");

    let todo = new ToDo(title, description, priority);
    todosArray.push(todo);

    localStorage.setItem("todoList", JSON.stringify(todosArray));
    renderToDos(); 

    console.log("Created: " + todo + " using the passed arguments: " + title + ", " + description + ", " + priority + " from the DOM");
    console.log("localStorage:", localStorage.getItem("todoList"));
    console.log("todosArray: ", todosArray);   
} 

export { todosArray };