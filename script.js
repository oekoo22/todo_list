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

        const newListInput = document.createElement("input");
        newListInput.classList.add("text");
        newListInput.type = "text";
        newListInput.value = todo;
        newListInput.setAttribute("readonly", "readonly");

        newListElement.appendChild(newListInput);

        const newListEdit = document.createElement("button");
        newListEdit.classList.add("edit");
        newListEdit.innerText = "Edit";

        newListElement.appendChild(newListEdit);

        const newListDelete = document.createElement("button");
        newListDelete.classList.add("delete");
        newListDelete.innerText = "Delete";

        newListElement.appendChild(newListDelete);

        listElement.appendChild(newListElement);

        input.value = "";

        newListEdit.addEventListener('click', () => {
            if (newListEdit.innerText == "Edit") {
                newListInput.removeAttribute("readonly");
                newListInput.focus();
                newListEdit.innerText = "Save";
            } else {
                newListInput.setAttribute("readonly", "readonly");
                newListEdit.innerText = "Edit";
            }
        })

        newListDelete.addEventListener('click', () => {
            listElement.removeChild(newListElement);
        })
    })
});

