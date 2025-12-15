const pool = require("../config/db");

const TodoModel = {
  async createTodo(title, userId) {
    const [result] = await pool.query(
      "INSERT INTO todos (title, user_id) VALUES (?, ?)",
      [title, userId]
    );
    return result.insertId;
  },

  async getTodosByUser(userId) {
    const [rows] = await pool.query("SELECT * FROM todos WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  async updateTodoStatus(todoId, userId, completed) {
    const [result] = await pool.query(
      "UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?",
      [completed, todoId, userId]
    );
    return result.affectedRows;
  },

  async deleteTodo(todoId, userId) {
    const [result] = await pool.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [todoId, userId]
    );
    return result.affectedRows;
  },
};

module.exports = TodoModel;
