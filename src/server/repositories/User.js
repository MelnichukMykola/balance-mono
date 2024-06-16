import pool from '../db.js';

class UserRepository {
  static async createUser({
    userName,
    hashedPassword,
    token
  }) {
    const response = await pool.query(
      'INSERT INTO users (name, password, token) VALUES ($1, $2, $3) RETURNING *',
      [userName, hashedPassword, token]
    )
    return response.rows[0]
  }

  static async getUserData(userName) {
    const response = await pool.query(
      'SELECT * FROM users WHERE name=$1',
      [userName]
    )
    
    if(!response.rows.length) {
      return null
    }
    return response.rows[0] // id
  }

  static async getUserToken(userName) {
    const response = await pool.query(
      'SELECT * FROM users WHERE name=$1',
      [userName]
    )
    
    if(!response.rows.length) {
      return null
    }
    return response.rows[0].token // token
  }

}

export default UserRepository;