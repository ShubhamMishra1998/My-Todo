const Todo = require("../models/todos");
const User = require("../models/user");

module.exports.showtodos = async (req, res) => {
  const user = await User.findById(req.user._id).populate("todos");
  // console.log(user);
  // const todos = await Todo.find({});
  const todos = user.todos;
  // console.log(todos);
  res.render("todos/index", { todos });
};

module.exports.todoSubmitForm = async (req, res) => {
  const userid = req.user._id;
  const user = await User.findById(userid);
  // console.log(user);
  const { todo } = req.body;
  const todoData = await Todo.create({ todo });
  // console.log(todoData._id);
  user.todos.push(todoData._id);
  await user.save();
  // console.log(user);

  res.redirect("/todos");
};

module.exports.todoNew = (req, res) => {
  res.render("todos/new");
};

module.exports.showtodoid = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/show", { todo });
};

module.exports.editTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/edit", { todo });
};

module.exports.pathchtodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  await Todo.findByIdAndUpdate(id, { todo });
  res.redirect(`/todos/${id}`);
};

module.exports.deletetodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
};
