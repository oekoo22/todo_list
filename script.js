window.addEventListener('load', () => {
    const form = document.querySelector("#todo-form");
    const input = document.querySelector("#todo-input");
    const listElement = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent the submit-button to refresh the page

        const todo = input.value;
        console.log(todo);
    })
});

