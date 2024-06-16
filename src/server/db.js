import pg from "pg";

const pool = new pg.Pool({
  user: "balance_mono_db_user",
  password: "0WzGbzTmqZTuMIAMWGGia6CZ4XpSAhxq",
  host: "dpg-cpng4sg8fa8c73b0q0a0-a.oregon-postgres.render.com",
  port: 5432,
  database: "balance_mono_db",
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

