const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
const User = require("../models/user");
const {
  showtodos,
  todoSubmitForm,
  todoNew,
  showtodoid,
  editTodo,
  pathchtodo,
  deletetodo,
} = require("../controllers/todo");
router.get("/todos", showtodos);

router.get("/todos/new", todoNew);

router.get("/todos/:id", showtodoid);

router.get("/todos/:id/edit", editTodo);

router.post("/todos", todoSubmitForm);

router.patch("/todos/:id", pathchtodo);

router.delete("/todos/:id", deletetodo);

module.exports = router;
