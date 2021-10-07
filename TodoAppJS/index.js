const input = document.querySelector("#input");
const ulList = document.querySelector(".list");
let todoList = [];

input.addEventListener("change", function(e) {
    addTodo(e.target.value);
    e.target.value = "";
});

ulList.addEventListener("click", function(e) {
    e.stopPropagation();
    if(e.target.nodeName === "BUTTON") {
        const li = e.target.parentNode.parentNode;
        deleteTodo(li.id);
        li.remove();
    } else if(e.target.nodeName === "SPAN" && e.target.classList.contains("todo-name")) {
        e.target.classList.toggle("completed");
        toggleTodo(e.target.parentNode.parentNode.id);
    }
});

function generateData(todoName) {
    return {
        id: new Date().getTime(),
        name: todoName,
        completed: false,
    }
}

function addTodo(todoName) {
    const todo = generateData(todoName);
    const li = document.createElement("LI");
    li.setAttribute("id", todo.id);
    li.innerHTML = `
        <div class="todo" >
            <span class="todo-name"> ${todo.name} </span>
            <button class="todo-close"> X </button>
        <div>
    `;
    ulList.prepend(li);
    todoList.push(todo);
}

function deleteTodo(id) {
    console.log(id);
    todoList = todoList.filter(todo => todo.id != id);
}

function toggleTodo(id) {
    todoList.forEach(todo => {
        if (todo.id == id) {
            todo.completed = !todo.completed;
        }
    });
}



