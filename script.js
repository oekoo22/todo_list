window.addEventListener('load', () => {
    const form = document.querySelector("#todo-form");
    const input = document.querySelector("#todo-input");
    const listElement = document.querySelector("#tasks");
    const emptyState = document.querySelector("#empty-state");
    
    // Lokale Speicherung laden
    loadTasks();
    
    // Event-Listener für das Formular
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        const todo = input.value.trim();

        if (!todo) {
            showNotification("Bitte gib eine Aufgabe ein", "error");
            return;
        }

        addTask(todo);
        input.value = "";
        
        // Nach dem Hinzufügen auf das Eingabefeld fokussieren
        input.focus();
    });
    
    // Funktion zum Hinzufügen einer Aufgabe
    function addTask(todoText, completed = false) {
        // Container für die Aufgabe
        const newListElement = document.createElement("div");
        newListElement.classList.add("task");
        if (completed) {
            newListElement.classList.add("completed");
        }
        
        // Textfeld für die Aufgabe
        const newListInput = document.createElement("input");
        newListInput.classList.add("text");
        newListInput.type = "text";
        newListInput.value = todoText;
        newListInput.setAttribute("readonly", "readonly");
        
        // Container für die Buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("task-buttons");
        
        // Button zum Erledigen der Aufgabe
        const newListComplete = document.createElement("button");
        newListComplete.classList.add("complete");
        newListComplete.innerHTML = completed ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check"></i>';
        newListComplete.title = completed ? "Als unerledigt markieren" : "Als erledigt markieren";
        
        // Button zum Bearbeiten der Aufgabe
        const newListEdit = document.createElement("button");
        newListEdit.classList.add("edit");
        newListEdit.innerHTML = '<i class="fas fa-edit"></i>';
        newListEdit.title = "Bearbeiten";
        
        // Button zum Löschen der Aufgabe
        const newListDelete = document.createElement("button");
        newListDelete.classList.add("delete");
        newListDelete.innerHTML = '<i class="fas fa-trash"></i>';
        newListDelete.title = "Löschen";
        
        // Elemente zusammenfügen
        newListElement.appendChild(newListInput);
        buttonContainer.appendChild(newListComplete);
        buttonContainer.appendChild(newListEdit);
        buttonContainer.appendChild(newListDelete);
        newListElement.appendChild(buttonContainer);
        listElement.appendChild(newListElement);
        
        // Event-Listener zum Bearbeiten
        newListEdit.addEventListener('click', () => {
            if (newListEdit.innerHTML === '<i class="fas fa-edit"></i>') {
                newListInput.removeAttribute("readonly");
                newListInput.focus();
                newListEdit.innerHTML = '<i class="fas fa-save"></i>';
                newListEdit.title = "Speichern";
            } else {
                newListInput.setAttribute("readonly", "readonly");
                newListEdit.innerHTML = '<i class="fas fa-edit"></i>';
                newListEdit.title = "Bearbeiten";
                saveTasks();
            }
        });
        
        // Event-Listener zum Erledigen
        newListComplete.addEventListener('click', () => {
            newListElement.classList.toggle("completed");
            if (newListElement.classList.contains("completed")) {
                newListComplete.innerHTML = '<i class="fas fa-times"></i>';
                newListComplete.title = "Als unerledigt markieren";
            } else {
                newListComplete.innerHTML = '<i class="fas fa-check"></i>';
                newListComplete.title = "Als erledigt markieren";
            }
            saveTasks();
        });
        
        // Event-Listener zum Löschen
        newListDelete.addEventListener('click', () => {
            if (confirm("Bist du sicher, dass du diese Aufgabe löschen möchtest?")) {
                newListElement.classList.add("fade-out");
                setTimeout(() => {
                    listElement.removeChild(newListElement);
                    saveTasks();
                    updateEmptyState();
                }, 300);
            }
        });
        
        // Leerer Zustand aktualisieren
        updateEmptyState();
        
        // Speichern
        saveTasks();
    }
    
    // Aufgaben lokal speichern
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task").forEach(taskElement => {
            const text = taskElement.querySelector(".text").value;
            const completed = taskElement.classList.contains("completed");
            tasks.push({ text, completed });
        });
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Aufgaben aus dem lokalen Speicher laden
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        if (tasks.length > 0) {
            tasks.forEach(task => {
                addTask(task.text, task.completed);
            });
        }
        
        updateEmptyState();
    }
    
    // Status für leere Liste aktualisieren
    function updateEmptyState() {
        if (listElement.children.length > 0) {
            emptyState.style.display = "none";
        } else {
            emptyState.style.display = "block";
        }
    }
    
    // Benachrichtigungen anzeigen
    function showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Tastatur-Shortcuts
    document.addEventListener('keydown', (e) => {
        // Strg+Enter, um eine neue Aufgabe hinzuzufügen
        if (e.ctrlKey && e.key === 'Enter') {
            if (document.activeElement !== input) {
                input.focus();
            } else {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});