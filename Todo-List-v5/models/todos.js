const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
    trim: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
