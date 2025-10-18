const pool = require('../DB/db');

const User = {
  async create({ name, email, age, password, role }) {
    const result = await pool.query(
      'INSERT INTO users (name, email, age, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, age, password, role]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
};

module.exports = User;