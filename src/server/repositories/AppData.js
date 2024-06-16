import pool from '../db.js'

class AppDataRepository {
  static async getAppData(userName) {
    const response = await pool.query(
      'SELECT * FROM app_data WHERE name=$1 ORDER BY id DESC LIMIT 1',
      [userName]
    )

    if (!response.rows.length) {
      return null
    }
    return response.rows[0].data
  }

  static async addAppData(data) {
    const { userName, store } = data
    await pool.query(
      'INSERT INTO app_data (name, data) VALUES ($1, $2) RETURNING *',
      [userName, JSON.stringify(store)]
    )
  }

  // static async deleteRefreshSession(refreshToken) {
  //   await pool.query(
  //     'DELETE FROM refresh_sessions WHERE refresh_token=$1',
  //     [refreshToken]
  //   )
  // }
}

export default AppDataRepository
