import { createToDo, todosArray } from "./createToDo.js";

export function addClick () {

    console.log("1- addClick function triggered!")

    const toDoInput = document.querySelector("#todo-input");
    const addButton = document.querySelector("#add-button");
    addButton.addEventListener("click", () => setToDoDetails(toDoInput));
    toDoInput.addEventListener("keydown", (e) => { if (e.key === "Enter") setToDoDetails(toDoInput)});
} 

function setToDoDetails (toDoInput) {

    console.log("2- setToDoDetails function triggered!");

    let toDoTitle = toDoInput.value;

    if (toDoTitle == "")
        return;

    toDoTitle = toDoTitle.charAt(0).toUpperCase() + toDoTitle.slice(1);

    toDoInput.value = "";

    // Set details in a dialog box

    const detailsDialog = document.createElement("dialog");
    detailsDialog.classList.add("details-dialog");

    document.body.appendChild(detailsDialog);

    detailsDialog.innerHTML = 
    `<h2>${toDoTitle}</h2>
    <h3>Fill out task details</h3>
    <form class="dialog-form">
        <input class="todo-description" name="description" type="text" required placeholder="Add a description">
        <select required class="todo-priority" name="priority">
            <option value="">Set priority</option>
            <option value="Not Important">Not Important</option>
            <option value="Important">Important</option>
            <option value="Very Important">Very Important</option>
        </select>
        <input type="submit" value="Done">
    </form>
    `;

    detailsDialog.showModal();

    const dialogForm = document.querySelector(".dialog-form");
    dialogForm.addEventListener("submit", () => {
        const toDoDescription = document.querySelector(".todo-description");
        const toDoPrioritySelect = document.querySelector(".todo-priority"); 

        console.log("Form submission triggered:");
        console.log("ToDo Title:", toDoTitle);
        console.log("ToDo Description:", toDoDescription.value);
        console.log("ToDo Priority:", toDoPrioritySelect.value);

        createToDo(toDoTitle, toDoDescription.value, toDoPrioritySelect.value);
        detailsDialog.close();
    });

}

export function renderToDos () {
    console.log("renderToDos function triggered!");
    console.log("Rendering array: ", todosArray);

    const toDosContainer = document.querySelector("#todos-container");
    toDosContainer.innerHTML = "";
    
    const clearAllButton = document.querySelector("#clear-all-button");
    clearAllButton.addEventListener("click", () => {
        toDosContainer.innerHTML = "";
        todosArray.length = 0;
        localStorage.removeItem("todoList");
        console.log("Cleared list!");
    });

    todosArray.forEach((todo) => {
        const toDoContainer = document.createElement("div");
        toDoContainer.classList.add("todo-container");

        const toDoTask = document.createElement("p");
        toDoTask.classList.add("todo-task-paragraph");

        toDoTask.innerHTML = `
        <input type="checkbox" class="todo-checkbox" name="todo-checkbox">${todo.title}
        `;

        const toDoDetailsContainer = document.createElement("div");
        toDoDetailsContainer.classList.add("todo-details-container");

        const toDoDescriptionButton = document.createElement("button");
        toDoDescriptionButton.classList.add("todo-description-button");
        toDoDescriptionButton.textContent = "Description";
    
        toDoDescriptionButton.addEventListener("click", () => {
            const toDoDescriptionDialog = document.createElement("dialog");
            toDoDescriptionDialog.classList.add("todo-description-dialog");
    
            const toDoDescription = document.createElement("p");
            toDoDescription.textContent = todo.description;
    
            let toDoDescriptionText = toDoDescription.textContent;
            toDoDescriptionText = toDoDescriptionText.charAt(0).toUpperCase() + toDoDescriptionText.slice(1);
    
            const toDoDescriptionContainer = document.createElement("div");
            toDoDescriptionContainer.innerHTML = `
            <h2>${todo.title}</h2>
            <h3 class="priority-description">${todo.priority}</h3>
            `;

            const descriptionPriorities = toDoDescriptionContainer.querySelectorAll(".priority-description");
            descriptionPriorities.forEach((descriptionPriority) => descriptionPriority.style.color = setPriorityColor(descriptionPriority));
    
            toDoDescription.textContent = toDoDescriptionText;
            toDoDescriptionContainer.appendChild(toDoDescription);
    
            toDoDescriptionDialog.appendChild(toDoDescriptionContainer);
    
            document.body.appendChild(toDoDescriptionDialog);
            toDoDescriptionDialog.showModal();
    
            // Close dialog when user clicks outside
    
            toDoDescriptionDialog.addEventListener('click', function (event) {
                var rect = toDoDescriptionDialog.getBoundingClientRect();
                var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
                  && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    toDoDescriptionDialog.close();
                    toDoDescriptionDialog.remove();
                }
            });
    
        });

        // Add a remove button

        const removeToDoButton = document.createElement("button");
        removeToDoButton.textContent = "Remove";
        removeToDoButton.classList.add("remove-todo-button");

        removeToDoButton.addEventListener("click", () => {

            const toDoIndex = todosArray.findIndex(currentTodo => currentTodo.title == todo.title);

            if (toDoIndex >= 0) {
                todosArray.splice(toDoIndex, 1);
                localStorage.setItem("todoList", JSON.stringify(todosArray));

                toDoContainer.remove();

                console.log("Removed ", todo);
                console.log("Updated localStorage:", localStorage.getItem("todoList"));
                console.log("Updated todosArray: ", todosArray);
            }
                
        });

        toDoDetailsContainer.appendChild(toDoDescriptionButton);
        toDoDetailsContainer.appendChild(removeToDoButton);

        toDoContainer.appendChild(toDoTask);
        toDoContainer.appendChild(toDoDetailsContainer);
        
        toDosContainer.appendChild(toDoContainer);
    
        const toDoCheckBox = toDoContainer.querySelector(".todo-checkbox");
        toDoCheckBox.addEventListener("change", () => {
            todo.completeStatus = !todo.completeStatus;
            console.log(todo.completeStatus);
        });
        
    });
}

function setPriorityColor (descriptionPriority) {

    if (descriptionPriority.textContent == "Not Important")
        return "#95f634";
    else if (descriptionPriority.textContent == "Important")
        return "#f0943e";
    else if (descriptionPriority.textContent == "Very Important")
        return "#f04d4d";   

}