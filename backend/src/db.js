const { Pool } = require("pg");

let pool;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    const sslEnabled = process.env.DATABASE_SSL === "true";
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

async function initDb() {
  const db = getPool();
  if (!db) {
    console.warn("DATABASE_URL not set. Leads will not be stored.");
    return;
  }
  await db.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      message TEXT,
      source TEXT,
      contact_method TEXT,
      page TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

module.exports = { getPool, initDb };
