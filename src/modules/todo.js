export class ToDo {
    constructor(title, description, priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completeStatus = false;
    }

    toggleCompleteStatus () {
        this.completeStatus = !this.completeStatus;
    }
    
}