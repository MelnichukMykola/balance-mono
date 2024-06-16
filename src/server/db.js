import pg from "pg";
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env)

const pool = new pg.Pool({
  user: process.env.VITE_USER,
  password: process.env.VITE_PASSWORD,
  host: process.env.VITE_HOST,
  port: process.env.VITE_DB_PORT,
  database: process.env.VITE_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

