module.exports = app => {
    const todo = require("../controllers/todo.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", todo.create);
  
    // Retrieve all todo
    router.get("/", todo.findAll);
  
    // Retrieve all published todo
    router.get("/published", todo.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", todo.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", todo.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", todo.delete);
  
    // Delete all todo
    router.delete("/", todo.deleteAll);
  
    app.use('/api/todo', router);
  };