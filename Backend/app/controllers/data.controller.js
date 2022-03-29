const db = require("../models");
const Todo = db.todo;
// Create and Save a new todo

    // Create a todo
    const todo = {
        title: "test",
        description: "asdf",
        datetime: "22/3/2022-20:26",
        published: false,
        favourite: false
    };
    const name = "test " 

    for (let i = 1; i < 101; i++) {

        todo.title = name + i 

        Todo.create(todo)
    } 