import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5433,
  database: "ballance_auth",
});

export default pool;