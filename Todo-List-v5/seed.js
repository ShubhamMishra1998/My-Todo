const mongoose = require("mongoose");
const Todo = require("./models/todos");
mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
const todolist = [
  {
    todo: "go to gym at 2pm",
  },

  {
    todo: "go to park at 5pm",
  },
  {
    todo: "go to office at 9am",
  },
  {
    todo: "go to home  at 5pm",
  },
  {
    todo: "go to sleep at 2am",
  },
];

Todo.insertMany(todolist).then(() => {
  console.log("todo list seeded");
});
