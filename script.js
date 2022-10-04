window.addEventListener('load', () => {
    const form = document.querySelector("#todo-form");
    const input = document.querySelector("#todo-input");
    const listElement = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent the submit-button to refresh the page

        const todo = input.value;

        if (!todo) {
            alert("Please enter a task");   
            return
        }

        const newListElement = document.createElement("div");
        newListElement.classList.add("task");

        const newTodoElement = document.createElement("div");
        newTodoElement.classList.add("content");
        newTodoElement.innerText = todo;

        newListElement.appendChild(newTodoElement);
        listElement.appendChild(newListElement);
    })
});

