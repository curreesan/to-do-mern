const TodoModel = require("../models/todoModel");

const TodoController = {
  async createTodo(req, res) {
    try {
      const { title } = req.body;
      const userId = req.user.id;

      if (!title) {
        return res.status(400).json({ message: "Title required" });
      }

      const todoId = await TodoModel.createTodo(title, userId);
      return res.status(201).json({ id: todoId, title });
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  },

  async getTodos(req, res) {
    try {
      const userId = req.user.id;
      const todos = await TodoModel.getTodosByUser(userId);
      return res.json(todos);
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  },

  async updateTodo(req, res) {
    try {
      const { completed } = req.body;
      const { id } = req.params;
      const userId = req.user.id;

      const updated = await TodoModel.updateTodoStatus(id, userId, completed);
      if (!updated) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.json({ message: "Todo updated" });
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  },

  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deleted = await TodoModel.deleteTodo(id, userId);
      if (!deleted) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.json({ message: "Todo deleted" });
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = TodoController;
