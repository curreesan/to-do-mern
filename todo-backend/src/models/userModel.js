const pool = require("../config/db");

const UserModel = {
  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  async createUser(email, hashedPassword) {
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    return result.insertId;
  },
};

module.exports = UserModel;
